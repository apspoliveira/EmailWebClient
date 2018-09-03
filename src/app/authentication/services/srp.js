angular.module('webmail.authentication')
  .factory('srp', srp);
function srp($http, $q, $rootScope, passwords, authApi, url, webcrypto, handle10003) {
    function generateProofs(len, hash, modulus, hashedPassword, serverEphemeral) {
	function toBN(arr) {
            const reversed = new Uint8Array(arr.length);
            for (var i = 0; i < arr.length; i++) {
                reversed[arr.length - i - 1] = arr[i];
            }
            return new asmCrypto.BigNumber(reversed);
        }
	
	function fromBN(bn) {
            const arr = bn.toBytes();
            const reversed = new Uint8Array(len / 8);
            for (var i = 0; i < arr.length; i++) {
                reversed[arr.length - i - 1] = arr[i];
            }
            return reversed;
        }

	const generator = new asmCrypto.BigNumber(2);

	var multiplier = toBN(hash(openpgp.util.concatUint8Array([fromBN(generator), modulus])));

	modulus = toBN(modulus);
        serverEphemeral = toBN(serverEphemeral);
        hashedPassword = toBN(hashedPassword);

	const modulusMinusOne = modulus.subtract(1);

        if (modulus.bitLength !== len) {
            return { Type: 'Error', Description: 'SRP modulus has incorrect size' };
        }

	modulus = new asmCrypto.Modulus(modulus);
        multiplier = modulus.reduce(multiplier);

	if (multiplier.compare(1) <= 0 || multiplier.compare(modulusMinusOne) >= 0) {
            return { Type: 'Error', Description: 'SRP multiplier is out of bounds' };
        }
	
	if (generator.compare(1) <= 0 || generator.compare(modulusMinusOne) >= 0) {
            return { Type: 'Error', Description: 'SRP generator is out of bounds' };
        }

        if (serverEphemeral.compare(1) <= 0 || serverEphemeral.compare(modulusMinusOne) >= 0) {
            return { Type: 'Error', Description: 'SRP server ephemeral is out bounds' };
        }

	var clientSecret, clientEphemeral, scramblingParam;
	
	do {
            do {
                clientSecret = toBN(webcrypto.getRandomValues(new Uint8Array(len / 8)));
            } while (clientSecret.compare(len * 2) <= 0); // Very unlikely                                

            clientEphemeral = modulus.power(generator, clientSecret);
            scramblingParam = toBN(hash(openpgp.util.concatUint8Array([fromBN(clientEphemeral), fromBN(serverEphemeral)])));
        } while (scramblingParam.compare(0) === 0); // Very unlikely     

	var subtracted = serverEphemeral.subtract(modulus.reduce(modulus.power(generator, hashedPassword).multiply(multiplier)));
        if (subtracted.compare(0) < 0) {
            subtracted = subtracted.add(modulus);
        }
        const exponent = scramblingParam
            .multiply(hashedPassword)
            .add(clientSecret)
            .divide(modulus.subtract(1)).remainder;
        const sharedSession = modulus.power(subtracted, exponent);

	const clientProof = hash(openpgp.util.concatUint8Array([fromBN(clientEphemeral), fromBN(serverEphemeral), fromBN(sharedSession)]));
        const serverProof = hash(openpgp.util.concatUint8Array([fromBN(clientEphemeral), clientProof, fromBN(sharedSession)]));
	
	return { Type: 'Success', ClientEphemeral: fromBN(clientEphemeral), ClientProof: clientProof, ExpectedServerProof: serverProof };
    }

    function generateVerifier(len, hashedPassword, modulus) {
	function toBN(arr) {
            const reversed = new Uint8Array(arr.length);
            for (var i = 0; i < arr.length; i++) {
                reversed[arr.length - i - 1] = arr[i];
            }
            return new asmCrypto.BigNumber(reversed);
        }
	
	function fromBN(bn) {
            const arr = bn.toBytes();
            const reversed = new Uint8Array(len / 8);
            for (var i = 0; i < arr.length; i++) {
                reversed[arr.length - i - 1] = arr[i];
            }
            return reversed;
        }
	
	const generator = new asmCrypto.BigNumber(2);

        modulus = new asmCrypto.Modulus(toBN(modulus));
	hashedPassword = toBN(hashedPassword);

        const verifier = modulus.power(generator, hashedPassword);
	return fromBN(verifier);
    }

    function tryRequest(method, endpoint, req, creds, headers, fallbackAuthVersion) {
        return authInfo(creds.Username).then(function (resp) {
		return tryAuth(resp, method, endpoint, req, creds, headers, fallbackAuthVersion);
	    });
    }

    function tryAuth(infoResp, method, endpoint, req, creds, headers, fallbackAuthVersion) {
	//console.log(infoResp);
	
	function srpHasher(arr) {
	    //console.log(pmcrypto.arrayToBinaryString(arr));
            return passwords.expandHash(pmcrypto.arrayToBinaryString(arr));
        }
	
	var proofs;
        var useFallback;

	const session = infoResp.data.SRPSession;
	const modulus = pmcrypto.binaryStringToArray(
						     pmcrypto.decode_base64(openpgp.cleartext.readArmored(infoResp.data.Modulus).getText())
						     );
        const serverEphemeral = pmcrypto.binaryStringToArray(pmcrypto.decode_base64(infoResp.data.ServerEphemeral));
	
	var authVersion = infoResp.data.Version;
        useFallback = authVersion === 0;
        if (useFallback) {
            authVersion = fallbackAuthVersion;
        }

	if (authVersion < 3) {
            creds.Username = infoResp.data.Username;
	}

	if (
            (authVersion === 2 && 
	     passwords.cleanUsername(creds.Username) !== passwords.cleanUsername(infoResp.data.Username)) ||
            (authVersion <= 1 && creds.Username.toLowerCase() !== infoResp.data.Username.toLowerCase())
	    ) {
            return Promise.reject({
		    error_description: 
		    'Please login with just your ProtonMail username (without @protonmail.com or @protonmai.ch.)'
			});
        }

	var salt = '';
        if (authVersion >= 3) {
            salt = pmcrypto.decode_base64(infoResp.data.Salt);
        }
	
	//console.log(authVersion);
	//console.log(creds.Password);
	//console.log(salt);
	//console.log(creds.Username);
	//console.log(modulus);
	
	//console.log(passwords.hashPassword(authVersion, creds.Passwords, salt, creds.Username, modulus));
	return passwords.hashPassword(authVersion, creds.Password, salt, creds.Username, modulus)
            .then(function (hashed) {
		    proofs = generateProofs(2048, srpHasher, modulus, hashed, serverEphemeral);
		    if (proofs.Type !== 'Success') {
			return Promise.reject({
				error_description: proofs.Description
				    });
		    }
		    const httpReq = {
			method,
			url: url.get() + endpoint,
			data: _.extend(req, {
				SRPSession: session,
				ClientEphemeral: pmcrypto.encode_base64(pmcrypto.arrayToBinaryString(proofs.ClientEphemeral)),
				ClientProof: pmcrypto.encode_base64(pmcrypto.arrayToBinaryString(proofs.ClientProof)),
				TwoFactorCode: creds.TwoFactorCode
			    })
		    };
		    if (angular.isDefined(headers)) {
			httpReq.headers = headers;
		    }

		    return $http(httpReq);
		},
		function (err) {
		    return Promise.reject({
			    error_description: err.message
			});
		}
		)
	    .then(
		  function (resp) {
		      if (pmcrypto.encode_base64(pmcrypto.arrayToBinaryString(proofs.ExpectedServerProof)) === resp.data.ServerProof) {
			  return Promise.resolve(_.extend(resp, { authVersion }));
		      }
		      
		      return Promise.reject({
			      error_description: 'Invalid server authentication'
				  });
		  },
		  function (error) {
		      const  data = error || {};

		      handle10003(data);

		      if (data.Error) {
			  return Promise.reject({
				  error_description: data.Error,
				      usedFallback: useFallback
				      });
		      }

		      return Promise.reject(error);
		      }
		  );
    }

    function authInfo(Username) {
	    return authApi.info({
		    Username,
			ClientID: "Web",
			ClientSecret: "4957cc9a2e0a2a49d02475c9d013478d"
			});
    }

    /**                                                                                                
     * Check the validity of a user                                                                   
     * @param {String} method       HTTP methods                                                      
     * @param {String} endpoint     URL                                                               
     * @param {Object} req          {Username:<String>, ClientID:<String>, ClientSecret:<String>}     
     * @param {Object} creds        {Username:<String>, Password:<String>, TwoFactorCode:<Null>}       
     * @param {void} initialInfoResp                                                                   
     * @param {Object} headers                                                                          
     * @return {Promise}                                                                                      */
    function performSRPRequest(method, endpoint, req, creds, initialInfoResp, headers) {
	var ret;
	//console.log(endpoint);
	//console.log(req);
	//console.log(creds);
	//console.log(initialInfoResp);

	if (initialInfoResp) {
            ret = tryAuth(initialInfoResp, method, endpoint, req, creds, headers, 2);
        } else {
            ret = tryRequest(method, endpoint, req, creds, headers, 2);
        }

	return ret;
    }
    
    function getArmor(headers, signatureHeaders) {
	

    }

    function randomVerifier(password) {
	promise = authApi.modulus();
	promise.then(function (response) {
	//data = Promise.resolve(promise);
	//console.log(response.data.Modulus);
	const modulus = pmcrypto.binaryStringToArray(pmcrypto.decode_base64(openpgp.cleartext.readArmored(response.data.Modulus).getText()));
	const salt = pmcrypto.arrayToBinaryString(webcrypto.getRandomValues(new Uint8Array(10)));
	hashedPassword = passwords.hashPassword(passwords.currentAuthVersion, password, salt, undefined, modulus);
		
	//console.log(hashedPassword);
	const verifier = generateVerifier(2048, hashedPassword, modulus);
	//console.log(verifier);
	
	//return verifier;
	return {
	    Auth: {
		Version: passwords.currentAuthVersion,
		    ModulusID: response.data.ModulusID,
		    Salt: pmcrypto.encode_base64(salt),
		    Verifier: pmcrypto.encode_base64(pmcrypto.arrayToBinaryString(verifier))
		    }
	};
	    });
    }
    
    /**                                                                                         
     * Get the configuration available for a password, and extend your config with it           
     * @param {String} password                                                                  
     * @param {Object} config
     * @return {Promise}                                                                        
     */
    function getPasswordParams(password, config) {
        data = randomVerifier(password);
	//console.log(data);
	return _.extend({}, config, data);
    }

    return { randomVerifier, performSRPRequest, getPasswordParams, info: authInfo };
}
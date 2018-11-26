angular.module('webmail')
    .factory('srp', srp);
function srp($http, authApi, passwords)  {
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
	
	modulus = new asmCrypto.Modulus(modulus);
        multiplier = modulus.reduce(multiplier);
       
	var clientSecret, clientEphemeral, scramblingParam;
	
	clientSecret = toBN(crypto.getRandomValues(new Uint8Array(len / 8)));                               
	clientEphemeral = modulus.power(generator, clientSecret);
	scramblingParam = toBN(hash(openpgp.util.concatUint8Array([fromBN(clientEphemeral), fromBN(serverEphemeral)])));
	
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
	console.log(serverProof);
	
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
    
    function performSRPRequest(method, endpoint, req, creds, infoResp, headers) {
	
	function srpHasher(arr) {
            return passwords.expandHash(openpgp.util.Uint8Array_to_str(arr));
        }
	
	var proofs;

	const session = infoResp.data.SRPSession;
	const modulus = openpgp.util.str_to_Uint8Array(atob(openpgp.cleartext.readArmored(infoResp.data.Modulus).getText().trim()));
        const serverEphemeral = openpgp.util.str_to_Uint8Array(atob(infoResp.data.ServerEphemeral.trim()));
	
	var authVersion = infoResp.data.Version;
	
	var salt = atob(infoResp.data.Salt.trim());
	
	return passwords.hashPassword(authVersion, creds.Password, salt, creds.Username, modulus).then(function (hashed) {
	    proofs = generateProofs(2048, srpHasher, modulus, hashed, serverEphemeral);
	    
	    const data = _.extend(req, { 
		SRPSession: session,
		ClientEphemeral: btoa(openpgp.util.Uint8Array_to_str(proofs.ClientEphemeral).trim()),
		ClientProof: btoa(openpgp.util.Uint8Array_to_str(proofs.ClientProof).trim()),
		TwoFactorCode: creds.TwoFactorCode
	    });
	    
	    return authApi.authenticate(data);
	});
    }
    
    function authInfo(Username) {
	params = {
	    Username,
	    ClientID: clientID,
	    ClientSecret: clientSecret
	};
	return authApi.info(params);
    }
   
    function randomVerifier(password) {
	return authApi.modulus().then(function (response) {
	    const modulus = openpgp.util.str_to_Uint8Array(pmcrypto.decode_base64(openpgp.cleartext.readArmored(response.data.Modulus).getText()));
	    const salt = openpgp.util.Uint8Array_to_str(crypto.getRandomValues(new Uint8Array(10)));
	    return passwords.hashPassword(passwords.currentAuthVersion, password, salt, undefined, modulus).then(function (hashedPassword) {
		const verifier = generateVerifier(2048, hashedPassword, modulus);
		
		return {
		    Auth: {
			Version: passwords.currentAuthVersion,
			ModulusID: response.data.ModulusID,
			Salt: pmcrypto.encode_base64(salt),
			Verifier: pmcrypto.encode_base64(openpgp.util.Uint8Array_to_str(verifier))
		    }
		};
	    })
	})
    }
    
    function getPasswordParams(password, config) {
	return randomVerifier(password).then(function(data) {
	    return _.extend({}, config, data);
	});    
    }
    
    return { getPasswordParams, performSRPRequest, authInfo };
}

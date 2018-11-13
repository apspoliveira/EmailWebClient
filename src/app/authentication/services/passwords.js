angular.module('webmail.authentication')
  .factory('passwords', passwords);
function passwords($q, webcrypto) {

    function cleanUsername(name) {
        return name.replace(/\.|-|_/g, '').toLowerCase();
    }

    function bcrypt(str, salt) {
	const deferred = $q.defer();
	dcodeIO.bcrypt.hash(str, salt, function(err, hash) {
		if (typeof hash !== 'string') {
		    deferred.reject(err);
		} else {
		    deferred.resolve(hash);
		}
		});
	return deferred.promise;
    }

    function expandHash(str) {
	return openpgp.util.concatUint8Array([
			openpgp.crypto.hash.sha512(pmcrypto.binaryStringToArray(str + '\x00')),
			openpgp.crypto.hash.sha512(pmcrypto.binaryStringToArray(str + '\x01')),
			openpgp.crypto.hash.sha512(pmcrypto.binaryStringToArray(str + '\x02')),
			openpgp.crypto.hash.sha512(pmcrypto.binaryStringToArray(str + '\x03'))
						   ]);
    }

    function computeKeyPassword(password, salt) {
        if (salt && salt.length) {
            const saltBinary = pmcrypto.binaryStringToArray(pmcrypto.decode_base64(salt));
            return bcrypt(password, '$2y$10$' + dcodeIO.bcrypt.encodeBase64(saltBinary, 16)).then(function (hash) {
		    // Remove bcrypt prefix and salt (first 29 characters)                            
		    return hash.slice(29);
		});
        }

        // No salt, old-style                                                                             
        const deferred = $q.defer();
        deferred.resolve(password);
        return deferred.promise;
    }

    function generateKeySalt() {
        return pmcrypto.encode_base64(pmcrypto.arrayToBinaryString(webcrypto.getRandomValues(new Uint8Array(16))));
    }
    
    const hashPasswordVersion = {
	4(password, salt, modulus) {
            return hashPasswordVersion[3](password, salt, modulus);
        },
	
	3(password, salt, modulus) {
	    const saltBinary = pmcrypto.binaryStringToArray(salt + 'proton');
	    // We use the latest version of bcrypt, 2y, with 2^10 rounds.
	    return bcrypt(password, '$2y$10$' + dcodeIO.bcrypt.encodeBase64(saltBinary, 16)).then(function (unexpandedHash) {
		    console.log(unexpandedHash);
		    return expandHash(unexpandedHash + pmcrypto.arrayToBinaryString(modulus))
		    });
	},
	
	2(password, userName, modulus) {
            return hashPasswordVersion[1](password, cleanUsername(userName), modulus);
        },
	
	1(password, userName, modulus) {
            const salt = openpgp.crypto.hash.md5(pmcrypto.binaryStringToArray(pmcrypto.encode_utf8(userName.toLowerCase())));
            var encodedSalt = '';
            for (var i = 0; i < salt.length; i++) {
                var byte = salt[i].toString(16);
                if (byte.length === 1) {
                    byte = '0' + byte;
                }
                encodedSalt += byte;
            }
            // See hash version 3 for explanation of the prefix                                     
	    return bcrypt(password, '$2y$10$' + encodedSalt).then(function (unexpandedHash) {
		    return expandHash(unexpandedHash + pmcrypto.arrayToBinaryString(modulus));
		});
        },
	
	0(password, userName, modulus) {
            const prehashed = pmcrypto.encode_base64(pmcrypto.arrayToBinaryString(openpgp.crypto.hash.sha512(pmcrypto.binaryStringToArray(userName.toLowerCase() + pmcrypto.encode_utf8(password)))));
            return hashPasswordVersion[1](prehashed, userName, modulus);
	}
    };
    
    const api = {
	currentAuthVersion: 4,
	cleanUsername,
	expandHash,
	hashPassword(version, password, salt, userName, modulus) {
	    switch (version) {
	    case 4:
	    case 3:
	    return hashPasswordVersion[version](password, salt, modulus);
	    case 2:
	    case 1:
	    case 0:
	    return hashPasswordVersion[version](password, userName, modulus);
	    default:
	    $q.reject({ message: 'Unsupported auth version' });
	    break;
	    }
	},
        computeKeyPassword,
	generateKeySalt
    }
    
    return api;
};
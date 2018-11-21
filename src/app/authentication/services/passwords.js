angular.module('webmail')
  .factory('passwords', passwords);
function passwords($q) {

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
	    openpgp.crypto.hash.sha512(openpgp.util.str_to_Uint8Array(str + '\x00')),
	    openpgp.crypto.hash.sha512(openpgp.util.str_to_Uint8Array(str + '\x01')),
	    openpgp.crypto.hash.sha512(openpgp.util.str_to_Uint8Array(str + '\x02')),
	    openpgp.crypto.hash.sha512(openpgp.util.str_to_Uint8Array(str + '\x03'))
	]);
    }
    
    const hashPasswordVersion = function(password, salt, modulus) {
	const saltBinary = openpgp.util.str_to_Uint8Array(salt + 'proton');
	return bcrypt(password, '$2y$10$' + dcodeIO.bcrypt.encodeBase64(saltBinary, 16)).then(function (unexpandedHash) {
	    return expandHash(unexpandedHash + openpgp.util.Uint8Array_to_str(modulus))
	});
    };
    
    const api = {
	currentAuthVersion: 4,
	expandHash,
	hashPassword(version, password, salt, userName, modulus) {
	    return hashPasswordVersion(password, salt, modulus);
	}
    }
    
    return api;
};

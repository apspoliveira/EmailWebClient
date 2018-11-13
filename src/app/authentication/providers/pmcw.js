angular.module('webmail.authentication')
    .provider('pmcw', pmcw);
function pmcw() {
    pmcrypto.checkMailboxPassword = function(prKey, prKeyPassCode, accessToken) {
        return new Promise(function(resolve, reject) {
		if (typeof prKey === 'undefined') {
		    return reject(new Error('Missing private key.'));
		}
		
		if (typeof prKeyPassCode === 'undefined') {
		    return reject(new Error('Missing Mailbox Password.'));
		}
		
		const keyPromise = pmcrypto.decryptPrivateKey(prKey, prKeyPassCode);

		keyPromise
                .then(function(privateKey) {
			const message = pmcrypto.getMessage(accessToken);
			// this is the private key, use this and decryptMessage to get the access token
			 pmcrypto
			     .decryptMessage({ message, privateKey })
			     .then(function(data) {
				     resolve({ password: prKeyPassCode, token: data })
					 })
			     .catch(function() {
				     reject(new Error('Unable to get Access Token.'));
				 });
		    })
		.catch(function() {
			reject(new Error('Wrong Mailbox password.'));
		    });
	    });  
    }
    this.$get = function()  {
	pmcrypto;
    }
}
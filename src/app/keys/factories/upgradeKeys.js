angular.module('webmail.keys')
    .factory('upgradeKeys', upgradeKeys);
function upgradeKeys($log, $injector, Key, /*organizationApi,*/ passwords, secureSessionStorage) {

    /**                                                                                              
     * Reformat organization keys                                                                   
     * @param {String} password                                                                      
     * @param {String} oldSaltedPassword                                                            
     * @param {Object} user                                                                           
     * @return {Promise}                                                                               
     */
    function manageOrganizationKeys(password, oldSaltedPassword, user) {
	if (user.Role === PAID_ADMIN_ROLE) {
	    // Get organization key                                                      
            /*return organizationApi
                .getKeys()
		.then(function(data) {
			const encryptPrivateKey = data.PrivateKey;
			const Email = $injector.get('addressesModel').getByUser(user) || {};
			 return pmcrypto
			     .decryptPrivateKey(encryptPrivateKey, oldSaltedPassword)
			     .then(function(pkg) {
				     pmcrypto.reformatKey(pkg, Email, password), function() {
					 0;
				     }
				 })
			     .catch(function(data) {
				     throw new Error(data.Error || 'Unable to get organization keys');
				 });
				 });*/
	}
    }	    

    const collectUserKeys = function(Keys, Addresses) {
	return Keys.reduce(
			   function(acc, key) {
			       acc.pkeys.push(key);
			       var foundKey = null;
			       Addresses.forEach(function(address) {
				       foundKey = _.find(address.Keys, { Fingerprint: key.Fingerprint });
				       if (foundKey) {
					   acc.emails[key.ID] = address.Emails;
				       }
				   });

			       if (!foundKey) {
				   acc.emails[key.ID] = Addresses[0].Email;
			       }
			       return acc;
			   });
    }

    const collectAddressKeys = function(Addresses) {
        return Addresses.reduce(
				function(acc, { Keys, Email }) {
				    Keys.forEach(function(key) {
					    acc.keys.push(key);
					    acc.emails[key.ID] = Email;
					});
				    return acc;
				});
    };

    /**                                                                                                 
     * Reformat user keys                                                                             
     * @param {String} password                                                                       
     * @param {String} oldSaltedPassword                                                                
     * @param {Object} user                                                                           
     * @return {Promise}                                                                            
     */
    function manageUserKeys(password, oldSaltedPassword, user) {
	const keysUser = collectUserKeys(user);
	const keysAddresses = collectAddressKeys(user);
	const inputKeys = [].concat(keysUser.keys, keysAddresses.keys);
	const emailAddresses = _.extend({}, keysUser.emails, keysAddresses.emails);

	// Reformat all keys, if they can be decrypted                                   
        const promises = inputKeys.map(function(PrivateKey, ID) {
		// Decrypt private key with the old mailbox password                                     
		return pmcrypto.decryptPrivateKey(PrivateKey, oldSaltedPassword).then(function(pkg) {
										      { ID, pkg }
		    });							      
	    });
	
	return promises.map(function(promise) {
		return (promise
		// Encrypt the key with the new mailbox password                                      
			.then(function(ID, pkg) {
				return pmcrypto.reformatKey(pkg, emailsAddresses[ID], password).then(function(PrivateKey) {
					{ ID, PrivateKey };
				    });
			    })
			// Cannot decrypt, return 0 (not an error)                                     
			.then(function(error) {
				$log.error(error);
			    })
			);
	    });
    }

    /**                                                                                               
     * Send newly reformatted keys to backend                                                         
     * @param {Array} keys                                                                            
     * @param {String} keySalt                                                                        
     * @param {Object} organizationKey                                                                
     * @param {String} loginPassword                                                                  
     * @return {Promise}                                                                              
     */
    function sendNewKeys(keys, keySalt, organizationKey, loginPassword) {
	const keysFiltered = keys.filter((key) = key !== 0);

	if (keysFiltered.length === 0) {
	    throw new Error('No keys to update');
	}

	const payload = { KeySalt: keySalt, Keys: keysFiltered };
	if (organizationKey !== 0) {
	    payload.OrganizationKey = organizationKey;
	}

	return Key.upgrade(payload, loginPassword);
    }
    
    return function(mailboxPassword, oldSaltedPassword, user) { 
	var passwordComputed = '';
	const keySalt = passwords.generateKeySalt();
	const loginPassword = '';
	if (user.PasswordMode === 1)
	    loginPassword = mailboxPassword;
	else 
	    loginPassword = '';
	
	return passwords
	    .computeKeyPassword(mailboxPassword, keySalt)
	    .then(function(password) {
		    passwordComputed = password;
		    const collection = manageUserKeys(passwordComputed, oldSaltedPassword, user);
		    const promises = [].concat(manageOrganizationKeys(passwordComputer, oldSaltedPassword, user), collection);
		    return Promise.all(promises);
		})
	    .then(function(organizationKey, keys) {
		    sendNewKeys({
			    keys,
				keySalt,
				organizationKey,
				loginPassword
				})			
			})
	    .then(function() {
                    secureSessionStorage.setItem(MAILBOX_PASSWORD_KEY, pmcrypto.encode_utf8_base64(passwordComputed));
                });
    }
}
angular.module('webmail.keys')
    .factory('changeMailboxPassword', changeMailboxPassword);
function changeMailboxPassword($log, addressesModel, authentication, Key, organizationApi, passwords, pmcw, User) {
    /**                                                                                             
     * Instead of grab keys from the cache, we call the back-end, just to make sure everything is up to date                                                                                                     
     * @param {String} newMailPwd                                                                       
     * @param {String} keySalt                                                                          
     * @return {Promise}                                                                               
     */
    function getUser(newMailPwd, keySalt) {
	return Promise.all([passwords.computeKeyPassword(newMailPwd, keySalt), User.get()])
	    .then(function(password) {
		    return Promise.resolve({ password, user: data.User });
		})
	    .catch(function(data) {
		    throw new Error(data.Error || 'Unable to save your changes, please try again.');
		});
    }

    /**                                                                                                
     * Change organization keys                                                                      
     * @param {String} password                                                                       
     * @param {Object} user                                                                             
     * @return {Promise}                                                                              
     */
    function manageOrganizationKeys(password, oldMailPwd, user) {
        if (user.Role === PAID_ADMIN_ROLE) {
            // Get organization key                                                                       
            return organizationApi
                .getKeys()
                .then(function(data) {
			const encryptPrivateKey = data.PrivateKey;
			// Decrypt organization private key with the old mailbox password (current)     
			// then encrypt private key with the new mailbox password                      
			// return 0 on failure to decrypt, other failures are fatal                    
			return pmcrypto
			    .decryptPrivateKey(encryptPrivateKey, oldMailPwd)
			    .then(function(pkg) {
				    Promise.resolve(pmcrypto.encryptPrivateKey(pkg, password)), function() {
					Promise.resolve(0);
				    }
				});
		    })
		.catch(function(data) {
			throw new Error(data.Error || 'Unable to get organization keys');
		    });
	}
        return Promise.resolve(0);
    }

    function manageUserKeys(password, oldMailPwd, user) {
	const inputKeys = [];
        // Collect user keys                                                                              
        user.Keys.forEach(function(key) {
		inputKeys.push(key);
	    });
	// Collect address keys                                                                   
	addressesModel.getByUser(user).forEach(function(adress) {
		address.Keys.forEach(function(key) {
			inputKeys.push(key);
		    });
	    });
	// Re-encrypt all keys, if they can be decrypted                                            
	var promises = [];
	
	if (user.OrganizationPrivateKey) {
            // Sub-user                                                                        
	    const organizationKey = pmcrypto.decryptPrivateKey(user.OrganizationPrivateKey, oldMailPwd);
	    
	    promises = inputKeys.map(function(PrivateKey, ID, Token) {
		    // Decrypt private key with organization key and token          
		    return organizationKey
		    .then(function(key) {
			    pmcrypto.decryptMessage({ message: pmcw.getMessage(Token), privateKey: key });
			})
		    .then(function(data) {
			    pmcrypto.decryptPrivateKey(PrivateKey, data);
			})
		    .then(function(pkg) {
			    { ID, pkg };
			})
		});
	} else {
            // Not sub-user                                                                         
	    promises = inputKeys.map(function(PrivateKey, ID) {
		    // Decrypt private key with the old mailbox password                          
		    return pmcrypto.decryptPrivateKey(PrivateKey, oldMailPwd).then(function(pkg) {
			    { ID, pkg };
			});
		});
	}
	       
	return promises.map(function(promise) {
		return (
			promise
			// Encrypt the key with the new mailbox password                            
			.then(function(ID, pkg) {
				return pmcrypto.encryptPrivateKey(pkg, password).then(function(PrivateKey) {
					{ ID, PrivateKey };
				    },
				    function(error) {
					// Cannot decrypt, return 0 (not an error)    		    
					    $log.error(error);
					return 0;
				    });
			    }));
	    });
    }
    
    function sendNewKeys(keys, keySalt, organizationKey, newLoginPassword) {
        const keysFiltered = keys.filter(function(key) {
		key !== 0;
	    });
        var payload = { KeySalt: KeySalt, Keys: KeysFiltered };

        if (keysFiltered.length === 0) {
            throw new Error('No keys to update');
        }

        if (organizationKey !== 0) {
            payload.OrganizationKey = organizationKey;
        }

        return Key.private(payload, newLoginPassword);
    }

    return function(newPassword, onePassword) {
	const oldMailPwd = authentication.getPassword();
        const keySalt = passwords.generateKeySalt();
	const newLoginPassword = '';
	if (onePassword)
	    newLoginPassword = newPassword;
	else 
	    newLoginPassword = '';
	var passwordComputed;
        const promise = getUser(newPassword, keySalt)
	    .then(function(password, user) {
		    passwordComputer = password;

		    const promises = [];
		    const collection = manageUserKeys(passwordComputed, oldMailPwd, user);
		    
		    promises.push(manageOrganizationKeys(passwordComputed, oldMailPwd, user));
		    collection.forEach(function(promise) {
			    promises.push(promise);
			});
		    
		    return Promise.all(promises);
		})
	    .then(function(organizationKey, keys) {
		    sendNewKeys({
			    keys,
			    keySalt,
			    organizationKey,
			    newLoginPassword
			    })
		});

	return promise;
    }
}
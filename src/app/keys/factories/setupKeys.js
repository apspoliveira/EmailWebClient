angular.module('webmail.keys')
    .factory('setupKeys', setupKeys);
function setupKeys($log, $q, Key, /*MemberKey,*/ passwords) {
    function generate(addresses, password, numBits) {
	console.log('generate keys');
	const keySalt = passwords.generateKeySalt();
	console.log(keySalt);
	const passwordPromise = passwords.computeKeyPassword(password, keySalt);
	console.log(passwordPromise);
	const promises = {
            mailboxPassword: passwordPromise,
            keySalt: $q.resolve(keySalt)
        };
	console.log(promises);
	console.log(passwordPromise);
	
	return passwordPromise.then(function(passphrase) {
		const keyPromises = _.map(addresses, function(object) {
			userIds = [{ name: object.Email, email: object.Email }];
			return pmcrypto.generateKey({
				userIds,
				    passphrase,
				    numBits
				    })
			.then(function(data)  {
				console.log(data);
				return { AddressID:  object.ID, 
					PrivateKey: data.privateKeyArmored };
			    });
		    });
		promises.keys = $q.all(keyPromises);
		return $q.all(promises);
	    });
    }

    function generateAddresses(addresses, mailboxPassword, numBits) {
        const promises = _.map(addresses, function(Email, ID) {
            return pmcrypto
	    .generateKey({
                    userIds: [{ name: Email, email: Email }],
                    passphrase: mailboxPassword,
                    numBits
                })
	    .then(function(privateKeyArmored) {
		    console.log(privateKeyArmored);
		    return { AddressID: ID,
			    PrivateKey: privateKeyArmored };
		});
	    });

        return $q.all(promises);
    }

    function generateOrganization(password, numBits) {
        return pmcrypto.generateKey({
		userIds: [{ name: 'not_for_email_use@domain.tld', email: 'not_for_email_use@domain.tld' }],
		    passphrase: password,
		    numBits
		    });
    }

    function decryptMemberToken(key, signingKey) {
	console.log(key);
	console.log(signingKey);
        const token = key.Token || key.Activation;
	console.log(token);
	
        return pmcrypto
            .decryptMessage({
		    message: pmcrypto.getMessage(token),
			privateKey: signingKey,
			publicKeys: signingKey.toPublic()
			})
            .then(function(decryptedToken, verified) {
		    console.log(decryptedToken);
		    console.log(verified);
		    if (verified !== 1) {
			return $q.reject({ message: 'Signature verification failed' });
		    }
		    console.log(key.PrivateKey);
		    return { PrivateKey: key.PrivateKey, decryptToken };
		});
    }
    
    function decryptMemberKey(key, signingKey) {
        return decryptMemberToken(key, signingKey).then(function(PrivateKey, decryptedToken) {
		console.log(key);
		console.log(signingKey);
		console.log(PrivateKey);
		console.log(decryptToken);
		pmcrypto.decryptPrivateKey(PrivateKey, decryptedToken);
	    });
    }
    
    function getPrimaryKey(member, organizationKey) {
	console.log(member);
	console.log(organizationKey);
        if (member.Keys.length === 0) {
            return $q.reject({ message: 'User not set up ' });
        }
	
        return decryptMemberKey(member.Keys[0], organizationKey);
    }
    
    function prepareSetupPayload(keySalt, keys, password) {
	console.log(keySalt);
	console.log(keys);
	console.log(password);
	
	if (password == undefined)
	    password = '';
	
	const payload = {
            KeySalt: keySalt,
            AddressKeys: keys
        };
	
        if (keys.length > 0) {
            payload.PrimaryKey = keys[0].PrivateKey;
        }
	
        var newPassword = '';
	if (password.length) {
            newPassword = password;
        }
	
	console.log(payload);
	console.log(newPassword);
	
        return {
            payload,
		newPassword
		};
    }

    function processMemberKey(mailboxPassword, key, organizationKey) {
        const randomString = pmcrypto.encode_base64(pmcrypto.arrayToBinaryString(webcrypto.getRandomValues(new Uint8Array(128))));
	console.log(randomString);
        var memberKey;

        return pmcrypto
            .decryptPrivateKey(key.PrivateKey, mailboxPassword)
            .then(function(result) {
		    console.log(result);
		    return pmcrypto.encryptPrivateKey(result, randomString);
		})
            .then(function(result) {
		    memberKey = result;
		    console.log(memberKey);
		    return pmcrypto.encryptMessage({
			    data: randomString,
				publicKeys: organizationKey.toPublic(),
				privateKeys: organizationKey
				});
		})
            .then(function(token) {
		    console.log(token);
		    return {
			AddressID: key.AddressID,
			    UserKey: key.PrivateKey,
			    MemberKey: memberKey,
			    Token: token
			    };
		});
		}
    
    function processMemberKeys(mailboxPassword, keys, organizationKey) {
        const promises = [];
        _.each(keys, function(key) {
		console.log(key);
		promises.push(processMemberKey(mailboxPassword, key, organizationKey));
	    });
	
        return $q.all(promises);
    }
    
    function errorHandler(data) {
	console.log(data);
        return $q.resolve(data.User || data.Member || data.MemberKey);
    }
    
    function reset({ keySalt, keys }, password, params) {
        const rv = prepareSetupPayload(keySalt, keys, password);
        rv.payload = _.extend(rv.payload, params);
	
        return Key.reset(rv.payload, rv.newPassword).then(errorHandler);
    }
    
    function memberSetup({ mailboxPassword, keySalt, keys }, password, memberID, organizationKey) {
	console.log(keySalt);
	console.log(memberID);
	return processMemberKeys(mailboxPassword, keys, organizationKey)
            .then(function(result) {
		    console.log(result);
		    /*return MemberKey.setup(
					   {
					       MemberID: memberID,
						   KeySalt: keySalt,
						   AddressKeys: result,
						   PrimaryKey: result[0]
						   }, password);*/
		})
		.then(errorHandler);
    }

    function setup(keySalt, keys, password) {
	console.log(keySalt);
	console.log(keys);
	console.log(password);
        const rv = prepareSetupPayload(keySalt, keys, password);
	console.log(rv);
	
        return Key.setup(rv.payload, rv.newPassword).then(function(data) { 
		//errorHandler(data);
	    });
    }
    
    function key(key) {
	console.log(key);
        return Key.create(key).then(errorHandler);
    }

    function memberKey(tempPassword, key, member, organizationKey) {
        console.log(tempPassword);
	console.log(key);
	console.log(member);
	console.log(organizationKey);
	return getPrimaryKey(member, organizationKey)
            .then(function(primaryKey) {
		    console.log(primaryKey);
		    return $q.all({
			    user: processMemberKey(tempPassword, key, primaryKey),
				org: processMemberKey(tempPassword, key, organizationKey)
				});
		})
            .then(function(user, org) {
		    console.log(user);
		    const payload = _.extend(org, {
			    MemberID: member.ID,
			    Activation: user.Token,
			    UserKey: user.MemberKey
			});
		    
		    return MemberKey.create(payload);
		})
            .then(errorHandler);
    }
    
    function decryptUser(user, addresses, organizationKey, mailboxPassword) {
        const privateUser = user.Private === 1;
	const subuser = angular.isDefined(user.OrganizationPrivateKey);

	const keyInfo = function(key) {
            return pmcrypto.keyInfo(key.PrivateKey).then(function(info) {
		    key.created = info.created; // Creation date                                              
		    key.bitSize = info.bitSIze; // We don't use this data currently                           
		    key.fingerprint = info.fingerprint; // Fingerprint                                        
		});
        };

	const activateKey = function(key, pkg) {
            return pmcrypto
	    .encryptPrivateKey(pkg, mailboxPassword)
	    .then(function(PrivateKey) {
		    Key.activate(key.ID, { PrivateKey });
		})
	    .then(function() {
		    console.log(pkg);
		    pkg;
		});
        };

	const storeKey = function(key, pkg, address) {
	    console.log(key);
	    console.log(pkg);
	    console.log(address);
            key.decrypted = true; // We mark this key as decrypted                                        
            return keyInfo(key).then(function() {
		    { address, key, pkg };
		});
        };

	const skipKey = function({ key, address, index }) {
	    console.log(key);
            key.decrypted = false; // This key is not decrypted                                           
            return keyInfo(key).then(function() {
		    // If the primary (first) key for address does not decrypt, display error.                
		    if (index === 0) {
			address.disabled = true; // This address cannot be used                          
		    }
		    return { address, key, pkg: null };
		});
        };

	const promises = [];
	
	// All user key are decrypted and stored                                                          
        const address = { ID: MAIN_KEY };
        _.each(user.Keys, function(key, index) {
		console.log(index);
	    
	    });
	
	return $q.all(promises).then(function(primaryKeys) {
		console.log(primaryKeys);
		const promises = [];
		const dirtyAddresses = [];

		// All address keys are decrypted and stored                        
		_.each(addresses, function(address) {
			if (address.Keys.length > 0) {
			    var index = 0;
			    _.each(address.Keys, function(key) {
				    if (subuser === true) {
					promises.push(decryptMemberKey(key, organizationKey).then(function(pkg) {
						    console.log(pkg);
						    storeKey({ key, pkg, address });
						}));
				    }
				    else if (key.Activation) {
					promises.push(
						      decryptMemberKey(key, primaryKeys[0].pkg)
						      .then(function(pkg) { activateKey(key, pkg) })
						      .then(function(pkg) {
							      storeKey({ key, pkg, address })
								  }));
				    }
				    else {
					promises.push(
						      pmcrypto
						      .decryptPrivateKey(key.PrivateKey, mailboxPassword)
						      .then(function(pkg) {
							      storeKey({ key, pkg, address }), function() {
								  skipKey({ key, address, index })
								      }
							  }));
					index++;
				    }
				})
				}
			
			else if (address.Status === 1 && privateUser === true) {
			    dirtyAddresses.push(address);
			}
		    });
		return $q.all(promises).then(function(addressKeys) {
			const keys = primaryKeys.concat(addressKeys).filter(function(key) {
				console.log(key);
				key.decrypted;
			    });
			return { keys, dirtyAddress };
		    });
	    });
    }
    
    return {
        decryptMemberToken,
	    decryptMemberKey,
	    generate,
	    generateAddresses,
	    generateOrganization,
	    key,
	    memberSetup,
	    memberKey,
	    setup,
	    reset,
	    decryptUser
	    };
}
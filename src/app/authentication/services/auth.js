angular.module('webmail.authentication')
  .factory('authentication', authentication);
function authentication($http, $location, $log, $q, $rootScope, $state, $injector, $exceptionHandler, authApi, checkKeysFormat, upgradePassword, Key, secureSessionStorage, /*organizationApi,*/ User, passwords, srp, setupKeys, /*AppModel,*/ tempStorage, /*sanitize,*/ upgradeKeys) {
    var keys = {}; // Store decrypted keys  
    const auth = {   
        headerSet: false,
	// The Authorization header is used just once for the /cookies route, then we forget it and use cookies instead.                                                                                          
	setAuthHeaders() {
            this.headersSet = true;
            $http.defaults.headers.common['x-pm-uid'] = auth.data.UID;
            if (auth.data.AccessToken) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + auth.data.AccessToken;
            } else {
                $http.defaults.headers.common.Authorization = undefined;
            }
	    
	    console.log($http.defaults.headers.common);
        },
    
	fetchUserInfo() {
	    console.log(auth.data);
	    console.log($http.defaults.headers.common);
	    
	    const promise = User.get()
	    .then(function(user) {
		    if (user.data.User.Keys.length === 0) {
			$state.go('login.setup');
                        return Promise.resolve(user);
		    }
		    
		    user.subuser = angular.isDefined(user.OrganizationPrivateKey);
		    // Required for subuser                                                               
                    const decryptOrganization = function() {
                        if (user.subuser) {
                            return pmcrypto.decryptPrivateKey(user.OrganizationPrivateKey, api.getPassword());
                        }
                        return Promise.resolve();
                    };
		    
		    // Hacky fix for missing organizations                                      
		    const fixOrganization = function() {
                        if (user.Role === FREE_USER_ROLE && user.Subscribed) {
			    return setupKeys
			    .generateOrganization(api.getPassword())
			    .then(function(response) {
				    console.log(response);
				    const privateKey = response.privateKeyArmored;
				    
                                    return {
                                        DisplayName: 'My Organization',
					    PrivateKey: privateKey
					    };
				})
			    .then(function(params) {
				    console.log(params);
                                    //return organizationApi.create(params);
                                });
			}
			return Promise.resolve();
		    };
		    
                    return $q.all({
                            settings: $injector.get('settingsApi').fetch(),
				mailSettings: $injector.get('settingsMailApi').fetch(),
				contacts: $injector.get('contactEmails').load(),
				addresses: $injector.get('addressesModel').fetch(user),
				fix: fixOrganization(),
				organizationKey: decryptOrganization()
				})
		    .then(function(organizationKey, addresses) {
			    { user, organizationKey, addresses };
			})
		    .then(function(user, organizationKey, addresses) {
			    const storeKeys = function(keys) {
				api.clearKeys();
				_.each(keys, function(address, key, pkg) {
					api.storeKey(address.ID, key.ID, pkg);
				    });
			    };
			    
			    return setupKeys.decryptUser(user, addresses, organizationKey, api.getPassword())
				.then(function(keys) { 
					(storeKeys(keys), user)
					    })
				.catch(function(error) {
					$exceptionHandler(error);
					throw error;
				    });
                        });

		});
	    
	    return promise;
	}
    }
	
    function saveAuthData(data) {
	$log.debug('saveAuthData', data);

	secureSessionStorage.setItem(OAUTH_KEY + ':UID', data.UID);
	
	auth.data = _.pick(data, 'UID', 'AccessToken', 'RefreshToken');

	console.log(auth.data);

	auth.setAuthHeaders();
    }

    function savePassword(pwd) {
	// Save password in session storage                                                           
	secureSessionStorage.setItem(MAILBOX_PASSWORD_KEY, pmcrypto.encode_utf8_base64(pwd));
    }

    function receivedCredentials(data) {
	$log.debug('receivedCredentials', data);
	
	saveAuthData(data);
	
	console.log($http.defaults.headers.common);
    }
    
    // RUN-TIME PUBLIC FUNCTIONS                                                            
    var api = {
	user: {},
	saveAuthData,
	receivedCredentials,

	detectAuthenticationState() {
	    
	    const uid = secureSessionStorage.getItem('proton:oauth' + ':UID');
	    const session = secureSessionStorage.getItem('proton:oauth' + ':SessionToken');
	    
	    if (uid) {
		auth.data = {
		    UID: uid
		};
		
		auth.setAuthHeaders();
	    } else if (session) {
		auth.data = {
		    UID: pmcrypto.decode_base64(session)
		};
		
		console.log(secureSessionStorage.getItem(OAUTH_KEY + ':SessionToken'));

		// Remove obsolete item                                                                
		secureSessionStorage.setItem(OAUTH_KEY + ':UID', auth.data.UID);
		secureSessionStorage.removeItem(OAUTH_KEY + ':SessionToken');

		auth.setAuthHeaders();
	    }
	},

	/**                                                                                            
	 * Return the mailbox password stored in the session storage                                   
	 */
	getPassword() {
	    const value = secureSessionStorage.getItem(MAILBOX_PASSWORD_KEY);
	    if (value)
		return pmcrypto.decode_utf8_base64(value);
	    else 
		return undefined;
	},

	randomString(length) {
	    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	    var i;
	    var result = '';
	    const isOpera = Object.prototype.toString.call(window.opera) === '[object Opera]';

	    if (window.crypto && window.crypto.getRandomValues) {
		const values = new Uint32Array(length);
		window.crypto.getRandomValues(values);
		
		for (i = 0; i < length; i++) {
		    result += charset[values[i] % charset.length];
		}

		return result;
	    } else if (isOpera) {
		// Opera's Math.random is secure, see http://lists.w3.org/Archives/Public/public-webcrypto/2013Jan/0063.html                   
		for (i = 0; i < length; i++) {
		    result += charset[Math.floor(Math.random() * charset.length)];
		}
		
		return result;
	    }
	    return this.semiRandomString(length);
	},

	semiRandomString(size) {
	    var string = '';
	    var i = 0;
	    const chars = '0123456789ABCDEF';

	    while (i++ < size) {
		string += chars[Math.floor(Math.random() * 16)];
	    }

	    return string;
	},

	/**                                                                                           
	 * Return the private keys available for a specific address ID                                
	 * @param {String} addressID                                                                  
	 * @return {Array}                                                                            
	 */
	getPrivateKeys(addressID) {
	    return keys[addressID];
	},

	/**                                                                                           
	 * Return the activated public keys available for a specific address ID                       
	 * @param {String} addressID                                                                  
	 * @return {Array}                                                                            
	 */
	getPublicKeys(addressID) {
	    return keys[addressID].map(function(key) { 
		    key.toPublic();
		});
	},

	/**                                                                                           
	 * Store package                                                                              
	 */
	storeKey(addressID, keyID, pkg) {
	    pkg.ID = keyID; // Add the keyID inside the package                                       
	    keys[addressID] = keys[addressID] || []; // Initialize array for the address              
	    keys[addressID].push(pkg); // Add key package                                             
	},

	/**                                                                                           
	 * Clear stored keys                                                                          
	 */
	clearKeys() {
	    keys = {};
	},

	setAuthCookie(authResponse) {
	    $log.debug('setAuthCookie', authResponse);

	    console.log(auth.data);
	    
	    return authApi.cookies({
		    ResponseType: 'token',
			ClientID: "Web",
			GrantType: 'refresh_token',
			RefreshToken: authResponse.RefreshToken,
			UID: authResponse.UID,
			RedirectURI: 'https://protonmail.com',
			State: this.randomString(24)
			})
	    .then(function (result) {
		    console.log($http.defaults.headers.common);
		    $log.debug(result);
		    $log.debug('/auth/cookies:', result);
		    $log.debug('/auth/cookies1: resolved');

		    $log.debug('/auth/cookies2: resolved');
		    $log.debug('headers change', $http.defaults.headers.common);

		    console.log(result.config.headers);
		    
		    if (!auth.data.AccessToken || !auth.data.RefreshToken || !auth.data.UID) 
			saveAuthData(result.data);

		    $rootScope.isLocked = false;

		    console.log($http.defaults.headers.common);

		    return result;
		},
		function (error) {
		    const data = error;
		    $log.error('setAuthCookie2', error);
		    throw new Error(data.Error || 'Error setting authentication cookies.');
		}
		);
	},

	getRefreshCookie() {
	    $log.debug('getRefreshCookie');
	    response = authApi.refresh();
	      
	    $log.debug(response);
	      
	    // Necessary during the transition to UIDs
	    saveAuthData(response.data);
	    
	    return response;
	},
	
	loginWithCredentials(creds, initialInfoResponse) {	    
	    const deferred = $q.defer();
	    
	    if (!creds.Username || !creds.Password) {
		deferred.reject({
			message: 'Username and Password are required to login'});
	    }
	    else {
		delete $http.defaults.headers.common.Accept;
		srp
		.performSRPRequest(
				   'POST', 
				   '/auth', 
    { 
	Username: creds.Username, 
	    ClientID: clientID, 
	    ClientSecret: clientSecret 
	    }, 
				   creds, 
				   initialInfoResponse)
		.then(function (resp) {
			console.log(resp);
			// Upgrade users to the newest auth version    
			if (resp.authVersion < passwords.currentAuthVersion) {
			    srp.getPasswordParams(creds.Password).then(function (data) {
				    upgradePassword.store(data);
				    deferred.resolve(resp);
				});
			} else {
			    deferred.resolve(resp);
			}
			// this is a trick! we dont know if we should go to unlock or step2 because we dont have user's data yet. so we redirect to the login page (current page), and this is determined in the resolve: promise on that state in the route. this is becaus we dont want to do another fetch info here.
		    },
		    function(error) {
			// TODO: This is almost certainly broken, not sure it needs to work though?    
			console.log(error);
			deferred.reject({
				message: error.error_description
				    });
		    }
		    );
	    }

	    console.log(deferred);

	    return deferred.promise;
	},

	existingSession() {
	    if (auth.data && auth.data.UID) {
		return true;
	    }

	    return false;
	},
	
	// Whether a user is logged in at all                                                
	isLoggedIn() {
	    const loggedIn = this.existingSession();
	      
	      if (loggedIn && auth.headersSet === false) {
		  
	      }
	    
	    return loggedIn;
	},

	// Whether the mailbox' password is accessible, or if the user needs to re-enter it           
	isLocked() {
	    return this.isLoggedIn() === false;
	},

	isSecured() {
	    return this.isLoggedIn();
	},
	
	state() {
	    if (this.isLoggedIn()) {
		return this.isLocked() ? 'login.unlock' : null;
	    }
	    return 'login';
	},

	// Redirect to a new authentication state, if required                                        
	redirectIfNecessary() {
	    const newState = this.state();

	    if (newState) {
		$state.go(newState);
	    }
	},

	/**                                                                                           
	 * Removes all connection data                                                                
	 * @param {Boolean} redirect - Redirect at the end the user to the login page                 
	 */
	logout(redirect, callApi) {
	    
	    const uid = secureSessionStorage.getItem(OAUTH_KEY + ':UID');
	    
	    const process = function() {
		
		if (redirect === true) {
		    $state.go('login');
		}
	    };

	    $rootScope.loggingOut = true;

	    if (callApi && uid) {
		authApi.revoke().then(process, process);
	    } else {
		process();
	    }
	},

	clearData() {
	    try {
		// Reset $http server                                                                 
		$http.defaults.headers.common['x-pm-session'] = undefined;
		$http.defaults.headers.common.Authorization = undefined;
		$http.defaults.headers.common['x-pm-uid'] = undefined;
		// Completely clear sessionStorage                                                    
		secureSessionStorage.clear();
		// Delete data key                                                                    
		delete auth.data;
		// Clean keys                                                                         
		keys = {};
		auth.headersSet = false;
		// Remove all user information                                                        
		this.user = {};
		// Clean onbeforeunload listener                                                      
		window.onbeforeunload = undefined;
		// Disable animation                                                                  
		$rootScope.loggingOut = false;
		// Re-initialize variables                                                            
		$rootScope.isLoggedIn = this.isLoggedIn();
		$rootScope.isLocked = this.isLocked();
		$rootScope.isSecure = this.isSecured();
		//AppModel.set('loggedIn', false);
	    } catch (e) {
		// Do nothing as we lazy load some service it can throw an error                      
		// -> ex signup                                                                       
	    }
	},

	// Returns a promise that will be successful only if the mailbox password              
	// proves correct (we test this by decrypting a small blob)                                   
	unlockWithPassword(pwd, PrivateKey, AccessToken, RefreshToken, Uid, ExpiresIn, EventID, KeySalt) {
	    console.log(pwd + ' ' + PrivateKey + ' ' + AccessToken + ' ' + RefreshToken + ' ' + Uid + ' ' + ExpiresIn + ' ' + EventID + ' ' + KeySalt);
	    const req = $q.defer();
	    if (pwd) {
		tempStorage.setItem('plainMailboxPass', pwd);
		passwords
		    .computeKeyPassword(pwd, KeySalt)
		    .then(function(pwd) {
			    console.log(pwd);
			    pmcrypto.checkMailboxPassword(PrivateKey, pwd, AccessToken)
				.then(function(token, password) {
					savePassword(password);
					console.log(token);
					console.log(password);
					receivedCredentials({
						AccessToken: token,
						    RefreshToken,
						    UID: Uid,
						    ExpiresIn,
						    EventID
						    });
					upgradePassword.send();
					req.resolve(200);
				    },
				    function() {
					req.reject({
						message: 'Wrong decryption password.'
						    });
				    });
				    });
	    }
	    else {
		req.reject({
			message: 'Password is required.'
		    });
	    }
	    
	    return req.promise;
	},
	
	fetchUserInfo() {
	    const promise = auth.fetchUserInfo();

	     return promise
	    .then(function(user) {
		    if (!user.DisplayName) {
			user.DisplayName = user.Name;
		    }
		    
		    $rootScope.isLoggedIn = true;
		    $rootScope.user = user;

		    const plainMailboxPass = tempStorage.getItem('plainMailboxPass');
		    tempStorage.removeItem('plainMailboxPass');
		    
		    if (plainMailboxPass && !user.OrganizationPrivateKey) {
			if (!checkKeysFormat(user)) {
			    //AppModel.set('upgradingKeys', true);
			    return upgradeKeys({ mailboxPassword: plainMailboxPass, oldSaltedPassword: this.getPassword(), user }).then(function() {
				    Promise.resolve(user)
					});
			}
		    }
		    
                    return user;
                })
	    .catch(function(error) {
		    $state.go('support.message');
                    throw error;
                });
	},
	params(params) {
	    return params;
	}
    };
    
    return api;
}
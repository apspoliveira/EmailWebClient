angular.module('webmail.authentication')
    .controller('LoginController', ['$rootScope', '$state', '$stateParams', '$scope', '$log', '$timeout', '$http', '$location', 'authentication', 'tempStorage', 'srp', 'authApi', LoginController]);
function LoginController(
			 $rootScope,
			 $state,
			 $stateParams,
			 $scope,
			 $log,
			 $timeout,
			 $http,
			 $location, 
			 authentication,
			 tempStorage,
			 srp,
			 authApi
			 ) {
    /**                                                                                               
     * Clean notifications                                                                             
     */
    function clearErrors() {
	$scope.error = null;
    }
     
    // Needed to handle back button from unlock state
    function setLoggedIn() {

	$rootScope.isLoggedIn = !$state.is('login');
       
    }
    
    /**                                                                                             
     * Focus specific input element                                                                
     */
    function focusInput() {
       
        $timeout(function() {
		$('#username').focus()
		    }, 30, false);
    }
    
    // Focus the password field
    function selectPassword() {
        const input = document.getElementById('password');
        input.focus();
        input.select();
    }
    
    function selectTwoFactor() {
        const input = document.getElementById('twoFactorCode');
        input.focus();
        input.select();
    }
    
    // Detect the #help parameter inside the URL and display the help modal 
    function checkHelpTag() {
        if ($location.hash() === 'help') {
            $scope.displayHelpModal();
        }
    }
    
    /**                                                                                                  
     * Detect if the current browser have session storage enable                                         
     * or notify the user                                                                                
     */
    function testSessionStorage() {
	if (hasSessionStorage() === false) {
	    message: 'You are in Private Mode or have Session Storage disabled.\nPlease deactivate Private Mode and then reload the page.';
	   
	}
    }
    
    /**                                                                                               
     * Detect if the current browser have cookie enable                                                
     * or notify the user                                                                              
     */
    function testCookie() {
        //                                                                                              
        if (hasCookie() === false) {
	    message: 'Cookies are disabled.\nPlease activate it and then reload the page.'
	       
	}
    }
    
    function autoLogin() {
       
	$scope.creds = tempStorage.getItem('creds');
	
	if ($state.is('login.unlock')) {
         
	    if (!$scope.creds) {
                return $state.go('login');
            }
	    
            if (!$scope.creds.authResponse) {
                tempStorage.setItem('creds', $scope.creds);
                return $state.go('login');
            }
	    
	    if ($scope.creds.authResponse.PasswordMode === 1) {
                return unlock($scope.creds.password, $scope.creds.authResponse);
            }
	} else if ($state.is('login.sub')) {
	  
	    const url = window.location.href;
            const arr = url.split('/');
            const domain = arr[0] + '//' + arr[2];
	    const login = function(event) {
                if (event.origin !== domain) {
                    return;
                }
		
                // Remove listener                                                                     
		window.removeEventListener('message', login);
		
                // Continues loading up the app                                    
                authentication.saveAuthData({ UID: event.data.UID });
		
                $rootScope.isSecure = true;
                $rootScope.isLoggedIn = true;
		
                // Redirect to inbox                                                              
		$state.go('secured.inbox');
            };
	    
	    window.addEventListener('message', login);
	    window.opener.postMessage('ready', domain);
	} else {
	
	    if (!$scope.creds || !$scope.creds.username || !$scope.creds.password) {
	      
		delete $scope.creds;
                return;
            }
	    srp
		.info($scope.creds.username)
		.then(function(resp) {
			if (resp.data.TwoFactor === 0) {
			    // user does not have two factor enabled, we will proceed to the auth call 
			    login($scope.creds.username, $scope.creds.password, null, resp);
			} else {
			    // user has two factor enabled, they need to enter a code first           
			    $scope.twoFactor = 1;
			    $scope.initialInfoResponse = resp;
			    $timeout(selectTwoFactor, 100, false);
			}
		    })
		.catch(function(error) {
			console.log(error);
		    });
	}  
    }
    
    // Function called at the initialization of this controller
    function initialization() {
	setLoggedIn();
	focusInput();
	checkHelpTag();
	testSessionStorage();
	testCookie();
	autoLogin();
    }
    
    function resetLoginInputs() {
	$scope.password = '';
    }
    
    function login(username, password, twoFactorCode, initialInfoResponse) {
       
	authentication 
	    .loginWithCredentials(
				  {
				      Username: username, 
					  Password: password 
					  },
				  initialInfoResponse 
				  )
	    .then(
		  function(result) {
		      $log.debug('loginWithCredentials:result.data ', result);
		      if (angular.isDefined(result.data) && angular.isDefined(result.data.Code) && result.data.Code === 401) {
			  console.log(result.data.Code);
			  selectPassword();
		      } else if (result.data && result.data.Code === 10002) {
			  console.log(result.data.Code);
			  var message;
			  
			  if (result.data.Error) {
			      message = result.data.Error;
			  } else {
			      message = 'Your account has been disabled.';
			  }
			  // This account is disabled. 
		      } else if (result.data && typeof result.data.PrivateKey === 'undefined') {
			  console.log(result.data);
			  authentication.receivedCredentials({
				  AccessToken: result.data.AccessToken, 
				      RefreshToken: result.data.RefreshToken, 
				      UID: result.data.Uid, 
				      ExpiresIn: result.data.ExpiresIn,
				      EventID: result.data.EventID 
				      });
			  authentication  
			      .setAuthCookie(result.data) 
			      .then(function () {
				      $rootScope.isLoggedIn = true;
				      $state.go('login.setup');
				  })
			      .catch(function(error) {
				      console.log(error.message);
				      $state.go('login');
				  });
		      } else if (result.data && result.data.AccessToken) {
                          console.log(result.data);
			  $rootScope.isLoggedIn = true;
			  const creds = {
			      username, 
			      password, 
			      authResponse: result.data 
			  };
			  
			  tempStorage.setItem('creds', creds);
			  $state.go('login.unlock');
		      } else if (result.data && result.data.Code === 5003) {
			  console.log(result.data);
			  // Nothing 
		      } else if (result.data && result.data.Error) {
			  console.log(result.data);
			  const error;
			  if (result.data.ErrorDescription)
			      error = result.data.ErrorDescription;
			  else 
			      error = result.data.Error;
			  resetLoginInputs();
		      } else {
			  console.log('Unable to log you in');
			  resetLoginInputs();
		      }
		  },
		  function(result) {
		      console.log(result);
		      if (result.message === undefined) {
			  result.message = 'Sorry, our login server is down. Please try again later.';
		      }
		      $scope.twoFactor = 0;
		      $timeout(selectPassword, 100, false);
		      console.log(result.message);
		      resetLoginInputs();
		  }
		  );
    }
    
    function unlock(mailboxPassword, authResponse) {
	$log.debug('unlockWithPassword' + authResponse);
	return authentication
	    .unlockWithPassword(mailboxPassword, authResponse)
	    .then(function(resp) {
                    $log.debug('unlockWithPassword:resp' + resp);
		    return authentication.setAuthCookie(authResponse).then(function(resp) {
			    $log.debug('setAuthCookie:resp' + resp);
			    $rootScope.isLoggedIn = authentication.isLoggedIn();
			    $rootScope.isLocked = authentication.isLocked();
			    $rootScope.isSecure = authentication.isSecured();
			    
			    $state.go('secured');
			    //$state.go('secured.inbox');
			});
                })
	    .catch(function(error) {
                    $log.error('login.unlock', error);
		    
                    // clear password for user                                                     
		    selectPassword();
		});
    }

    /**                                                                                               
     * Open login modal to help the user                                                              
     */
    /*$scope.helpLoginModal = function() {
	    
      };*/
    
    $scope.enterLoginPassword = function(e) {
	
	e.preventDefault();
	
	angular.element('input').blur();
	angular.element('#pm_login').attr({ action: '/*' });
	clearErrors();
	
	const username = $scope.user.name;
	const password = $scope.user.password;
	
	try {
	    if (!username || !password) {
		throw new Error('Please enter your username and password');
	    }
	    
	    const usernameLowerCase = username.toLowerCase();
	    const passwordEncoded = pmcrypto.encode_utf8(password);
	    
	    if (!passwordEncoded)
		console.log('Your password is missing');
	   
	    srp.info(usernameLowerCase)
		.then(function(resp) {
			$scope.initialInfoResponse = resp;
			login(usernameLowerCase, password, null, $scope.initialInfoResponse);
		    });
		        
	} catch (error) {
	    return Promise.reject(error);
	}
	
	console.log(authentication);
    };

    $scope.enterTwoFactor = function(e) {
	e.preventDefault();

	if (angular.isUndefined($scope.twoFactorCode) || $scope.twoFactorCode.length === 0) {
	    return new Error('Please enter your two-factor passcode');
	}
	login($scope.username, $scope.password, $scope.twoFactorCode, $scope.initialInfoResponse);
    };
    
    $scope.unlock = function(e) {
	e.preventDefault();
	// Blur unlock password field                                                                 
	angular.element('[type=password]').blur();
	// Make local so extensions (or Angular) can't mess with it by clearing the form too early    
	const mailboxPassword = $scope.mailboxPassword;

	clearErrors();

	unlock(mailboxPassword, $scope.creds.authResponse);
    }
    
    $scope.reset = function() {
	$rootScope.isLoggedIn = false;
	$state.go('support.reset-password');
    };
    
    initialization();
}
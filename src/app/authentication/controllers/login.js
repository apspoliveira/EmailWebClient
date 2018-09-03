//'use strict';
//import { hasSessionStorage, hasCookie } from '../../../helpers/browser';
/*function LoginController($scope) {	
		$scope.master = {};
        
        $scope.update = function(user) {
            $scope.master = angular.copy(user);
        };
    
        $scope.reset = function() {
            $scope.user = angular.copy($scope.master);
        };
    
        $scope.reset();
};*/
/*
function LoginController(
    $rootScope,
    $state,
    $stateParams,
    $scope,
    $log,
    $timeout, 
    $http,
    $location,
    CONSTANTS,
    CONFIG,
    dispatchers, 
    gettextCatalog, 
    authentication,
    networkActivityTracker, 
    notify,
    pmcw, 
    tempStorage,
    srp
) {
   // const { on, unsubscribe } = dispatchers();
    $scope.twoFactor = 0;
    $scope.showOld = window.location.hostname !== 'old.protonmail.com';
    $scope.domoArigato = true;

    $scope.$on('$destroy', unsubscribe);

    // Set $rootScope.isLoggedIn 
    // Needed to handle back button from unlock state
    function setLoggedIn() {
        $rootScope.isLoggedIn = !$state.is('login');
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
        //if ($location.hash() === 'help') {
            $scope.displayHelpModal();
        //}
    }

        // Function called at the initialization of this controller
        function initialization() {
            setLoggedIn();
            checkHelpTag();
        }

        function resetLoginInputs() {
            $scope.password = '';
            $scope.twoFactorCode = '';
        }*/
/*
        function login(username, password, twoFactorCode, initialInfoResponse) {
            networkActivityTracker.track(
                authentication 
                    .loginWithCredentials(
                        {
                            Username: username, 
                            Password: password, 
                            TwoFactorCode: twoFactorCode 
                        },
                        initialInfoResponse 
                    )
                    .then(
                        (result) => {
                            $log.debug('loginWithCredentials:result.data ', result);
                            if (angular.isDefined(result.data) && angular.isDefined(result.data.Code) && result.data.Code === 401) {
                                selectPassword();
                                notify({ message: result.data.ErrorDescription, classes: 'notification-danger' });
                            } else if (result.data && result.data.Code === 10002) {
                                let message;

                                if (result.data.Error) {
                                    message = result.data.Error;
                                } else {
                                    message = 'Your account has been disabled.';
                                }
                                // This account is disabled. 
                                notify({ message, classes: 'notification-danger' });
                            } else if (result.data && typeof result.data.PrivateKey === 'undefined') {
                                authentication.receivedCredentials({
                                    AccessToken: result.data.AccessToken, 
                                    RefreshToken: result.data.RefreshToken, 
                                    UID: result.data.Uid, 
                                    ExpiresIn: result.data.ExpiresIn,
                                    EventID: result.data.EventID 
                                });
                                authentication  
                                    .setAuthCookie(result.data) 
                                    .then(() => {
                                        $rootScope.isLoggedIn = true;

                                        $state.go('login.setup');
                                    })
                                    .catch((error) => {
                                        notify({ message: error.message, classes: 'notification-danger' });
                                        $state.go('login');
                                    });
                            } else if (result.data && result.data.AccessToken) {
                                $rootScope.isLoggedIn = true;
                                const creds = {
                                    username, 
                                    password, 
                                    authResponse: result.data 
                                };

                                tempStorage.setItem('creds', creds);
                                $state.go('login.unlock');
                            } else if (result.data && result.data.Code === 5003) {
                                // Nothing 
                            } else if (result.data && result.data.Error) {
                                const error = result.data.ErrorDescription ? result.data.ErrorDescription : result.data.Error;

                                notify({ message: error, classes: 'notification-danger' });
                                resetLoginInputs();
                            } else {
                                notify({ message: 'Unable to log you in.', classes: 'notification-danger' });
                                resetLoginInputs();
                            }
                        },
                        (result) => {
                            if (result.message === undefined) {
                                result.message = 'Sorry, our login server is down. Please try again later.';
                            }
                            $scope.twoFactor = 0;
                            $timeout(selectPassword, 100, false);
                            notify({ message: result.message, classes: 'notification-danger' });
                            console.error(result);
                            resetLoginInputs();
                        }
                    )
            );
        }
*/
    /*    // Open login modal to help the user
        $scope.displayHelpModal = () => {
            helpLoginModal.activate({
                params: {
                    close() {
                        helpLoginModal.deactivate();
                    }
                }
            });
        };

        $scope.enterLoginPassword = (e) => {
            e.preventDefault();

            angular.element('input').blur();
            angular.element('#pm_login').attr({ action: '/*' });

            const { username = '', password = '' } = $scope;

            try {
                if (!username || !password) {
                    throw new Error(gettextCatalog.getString('Please enter your username and password', null, 'Login error'));
                }

                const usernameLowerCase = username.toLowerCase();
                const passwordEncoded = pmcw.encode_utf8(password);

                if (!passwordEncoded) {
                    throw new Error(gettextCatalog.getString('Your password is missing', null, 'Login error'));
                }

                networkActivityTracker.track(
                    srp.info(usernameLowerCase).then(
                        (resp) => {
                            $scope.initialInfoResponse = resp;
                            if (resp.data.TwoFactor === 0) {
                                // user does not have two factor enabled, we will proceed to the auth call 
                                login(usernameLowerCase, password, null, $scope.initialInfoResponse);
                            } else {
                                // user has two factor enabled, they need to enter a code first 
                                $scope.twoFactor = 1;
                                $timeout(selectTwoFactor, 100, false);
                            }
                        },  
                        (error) => {
                            return Promise.reject(error);
                        }
                    )
                );
            } catch (error) {
                const { message } = error;
                notify({ message, classes: 'notification-danger' });
            }
        };
*/
    /*    initialization();
    }*/

// Register `authentication` directive on the `authentication`
/*angular  
    .module('authentication')
    .controller('LoginController', ['$scope', function($scope) {
        $scope.master = {};
    
        function helpLoginModal() {
            return {
                templateUrl: 'templates/helpModal.template.html'
            };
        }

        $scope.update = function(user) {
            $scope.master = angular.copy(user);
        };
    
        $scope.reset = function() {
            $scope.user = angular.copy($scope.master);
        };

        $scope.displayHelpModal = function() {
            //$scope.user = { "name": "apse",
            //"password": "aaa" 
            //}
            helpLoginModal();
        };
    
        $scope.reset();
    }]).
    directive('authentication', function() {
        return {
            templateUrl: 'templates/authentication.template.html'
            //controller: LoginController
        }
    })
    .directive('loginModal', function() {
        return {
            templateUrl: 'templates/helpModal.template.html' 
        };
    });*/
    //.directive('loginForm', loginForm);
    //export default LoginController;
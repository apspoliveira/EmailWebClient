angular.module('webmail.core')
    .controller('SignupController', SignupController);
function SignupController($location, $rootScope, $scope, $state, $stateParams, signupUserProcess, signupModel, passwords, authentication) 
{
    // NOTE I don't know where the "u" parameter is set                                               
    const initUsername = function () { $location.search().u || $stateParams.username || '' };

    /*                                                                                                
      1 === user form                                                                                   
      2 === keys generator                                                                              
      3 === humanity test                                                                               
      4 === payment                                                                                     
      5 === creating                                                                                    
    */
    $scope.step = 1;

    authentication.logout(false, authentication.isLoggedIn());

    // Clear auth data  
    $scope.createAccount = function() {
	$scope.step = 5;

	$scope.account = {
            notificationEmail: $scope.notificationEmail,
            username: $rootScope.username, // Prepopulate the username                  
            domain: $rootScope.domain, // Select the domain                                        
	    password: $rootScope.password,
            email: $scope.notitificationEmail,
            codeVerification: $scope.model.codeVerification,                                   
	    captcha_token: $scope.model.captcha_token,                                         
	    smsCodeVerification: $scope.model.smsCodeVerification,                            
	    emailVerification: $scope.model.emailVerification
	};

        if ($scope.account != undefined && $scope.model != undefined) {
            $scope.account.email = $scope.model.notificationEmail;
            $scope.account.notificationEmail = $scope.model.notificationEmail;
	    }

        signupUserProcess.createAccount($scope.account);
    }
    
    $scope.updateAccount = function() {
	$scope.step = 1;
	
	$scope.account = {
	    notificationEmail: $scope.notificationEmail,
	    username: $rootScope.username, // Prepopulate the username                      
	    domain: $rootScope.domain, // Select the domain                                           
	    password: $rootScope.password,
	    email: $scope.notificationEmail,
	    codeVerification: '', // Initialize verification code                                     
	    captcha_token: false, // Intialize captcha token                                          
	    smsCodeVerification: '', // Initialize sms verification code                              
	    emailVerification: ''
	};

	signupModel.store($scope.account);
	    
	signupModel.set('Type', 1);
    };

    $scope.$on('$destroy', function () {
      
	});
};
angular.module('webmail')
    .controller('SignupController', SignupController);
function SignupController($rootScope, $scope, signupUserProcess, signupModel, passwords, authentication) 
{
    $scope.domains = [{
	    value: 1,
	    label: 'gmail.com'}, {
	    value: 2,
	    label: 'Yahoo Mail'}, {
	    value: 3,
	    label: 'protonmail.com'}, {
	    value: 4,
	    label: 'AOL Mail'}];
    
    $scope.updateDomain = function() {                                                 
	$rootScope.username = $scope.username;
	$rootScope.domain = $scope.domain.label;
    };
    
    $scope.updatePassword = function() {
	$rootScope.password = $scope.password;
    };
    
    // Clear auth data  
    $scope.createAccount = function() {
	
	$scope.account = {
            notificationEmail: $rootScope.notificationEmail,
            username: $rootScope.username,               
            domain: $rootScope.domain,                                      
	    password: $rootScope.password,
            email: $rootScope.notitificationEmail
	};
	
        if ($scope.account != undefined && $scope.model != undefined) {
            $scope.account.email = $scope.model.notificationEmail;
            $scope.account.notificationEmail = $scope.model.notificationEmail;
	}
	
	signupModel.store($scope.account);
        signupUserProcess.createAccount($scope.account);
    }
};

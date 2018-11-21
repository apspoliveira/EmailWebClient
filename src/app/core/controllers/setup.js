angular.module('webmail')
    .controller('SetupController', SetupController);
function SetupController($http, $q, $rootScope, $scope, address, authentication, passwords, User) {
    
    var passwordCopy;
    var user;
    
    function initialization() {
        // Variables                
	$scope.filling = true;
        $scope.creating = false;
        $scope.genKeys = false;
        $scope.setupAccount = false;
        $scope.getUserInfo = false;
        $scope.finishCreation = false;
	
        $scope.generating = false;
        $scope.domains = [];
	
        // Select the first domain                                                                  
	$scope.domain = $scope.domains[0]; 
	
        // Passwords                                                                                  
	$scope.password = '';
        $scope.passwordConfirm = '';
	
	user = User.get().then(function(data) { 
		console.log(data);
		return data; 
	    });
    }
    
    $scope.submit = function() {
	                                                
	passwordCopy = $scope.password;
	
	var address = setupAddress();
	var data = generateKeys();
	var keys = installKeys(data);
	var user = doGetUserInfo();
    };
    
    function setupAddress() {
        $scope.filling = false;
	
	user.then(function(object) {
		if (!object.data.User.Addresses.length) {
		    return address.setup({ Domain: 'protonmail.com' })
			.then(function(data) {
				user.Addresses = [data.Addresses];
				return user;
			    })
			}
	    });
	return $q.resolve(user);
    }
    
    function generateKeys() {
        $scope.genKeys = true;
	
	return user.then(function(object) {
	
	    });
    }
    
    function installKeys(data) {
        $scope.genKeys = false;
        $scope.creating = true;
        $scope.setupAccount = true;
	
	var passwordCopy = $scope.password;
	
	return data.then(function(object) {
	    authentication.savePassword(object.mailboxPassword); 
	});
    }
    
    function doGetUserInfo() {
        $scope.getUserInfo = true;
        return authentication.fetchUserInfo();
    }
    
    function finishRedirect() {
        $scope.finishCreation = true;
	
	authentication.user = $rootScope.user;
    }
    
    initialization();
}

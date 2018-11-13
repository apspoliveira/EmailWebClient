angular.module('webmail.core')
    .controller('SetupController', SetupController);
function SetupController($http, $location, $log, $q, $rootScope, $scope, $state, address, authentication,Key, passwords, secureSessionStorage, setupKeys, User) {
    console.log('Setup Controller');
    
    var passwordCopy;
    var user;
    
    function initialization() {
	console.log(authentication);
	
	console.log($http.defaults);
	
	console.log($location);
	
	console.log(passwords);
	
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
	
        // Save password in separate variable to prevent extensions/etc                            
	// from modifying it during setup process                                                   
	passwordCopy = $scope.password;
	
	var address = setupAddress();
	console.log(address);
	var data = generateKeys();
	console.log(data);
	var keys = installKeys(data);
	console.log(keys);
	var user = doGetUserInfo();
	console.log(user);
	finishRedirect();
    };
    
    function setupAddress() {
        $log.debug('setupAddress');
        $scope.filling = false;
	
	user.then(function(object) {
		console.log(object);
		console.log(object.data.User.Addresses.length);
		if (!object.data.User.Addresses.length) {
		    return address.setup({ Domain: 'protonmail.com' })
			.then(function(data) {
				console.log(data);
				user.Addresses = [data.Addresses];
				return user;
			    })
			}
	    });
	return $q.resolve(user);
    }
    
    function generateKeys() {
        $log.debug('generateKeys');
        $scope.genKeys = true;
	
	return user.then(function(object) {
		console.log(object);
		return setupKeys.generate(object.data.User.Addresses, passwordCopy, 2048);
	    });
    }
    
    function installKeys(data) {
        $log.debug('installKeys');
        $scope.genKeys = false;
        $scope.creating = true;
        $scope.setupAccount = true;
	
	var passwordCopy = $scope.password;
	
	return data.then(function(object) {
		setupKeys.setup(object.keySalt, object.keys, passwordCopy).then(function() {
			authentication.savePassword(object.mailboxPassword);
			
			$rootScope.isLoggedIn = authentication.isLoggedIn();
			$rootScope.isLocked = authentication.isLocked();
			$rootScope.isSecure = authentication.isSecured();
		    });
	    });
    }
    
    function doGetUserInfo() {
        $log.debug('getUserInfo');
        $scope.getUserInfo = true;
        return authentication.fetchUserInfo();
    }
    
    function finishRedirect() {
        $log.debug('finishRedirect');
        $scope.finishCreation = true;
	
	authentication.user = $rootScope.user;
	
	//if ($scope.delinquent < 3) {
	//    console.log('redirect to inbox');
	//console.log($state.go('inbox', { welcome: true }));
	//}
       $state.go('secured');
    }
    
    initialization();
}
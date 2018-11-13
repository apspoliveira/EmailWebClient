angular.module('webmail.core')
    .controller('SecuredController', SecuredController);
function SecuredController($rootScope, $scope, $state, /*$http,*/ authentication, cacheCounters, contactCache, resurrecter, secureSessionStorage, userType) {
    console.log('Secured Controller');
    
    function initialization() { 
	console.log('secured user');                                                
	
	console.log(authentication);
	console.log(secureSessionStorage);                                          
	
	const uid = secureSessionStorage.getItem(OAUTH_KEY + ':UID');
	
	console.log(uid);
	
	console.log(secureSessionStorage.getItem(OAUTH_KEY + ':SessionToken'));
	
	if (uid) {
	    //$http.defaults.headers.common['x-pm-uid'] = uid;
	} else if (angular.isDefined(secureSessionStorage.getItem(OAUTH_KEY + ':SessionToken'))) {
	    //$http.defaults.headers.common['x-pm-uid'] = pmcrypto.decode_base64(secureSessionStorage.getItem(OAUTH_KEY + ':SessionToken') || '');
	    // secureSessionStorage.setItem(OAUTH_KEY + ':UID', $http.defaults.headers.common['x-pm-uid']);
	    secureSessionStorage.removeItem(OAUTH_KEY + ':SessionToken');      
	}
	
	authentication.fetchUserInfo().then(function(data) {
		console.log(data);
		data;
	    });
    }
    
    $scope.user = authentication.user;
    
    console.log($scope.user);

    const setUserType = function() {
        var { isAdmin, isFree } = userType();
        $scope.isAdmin = isAdmin;
        $scope.isFree = isFree;
    };
    
    $rootScope.isLoggedIn = true; // Shouldn't be there                                            
    $rootScope.isLocked = false; // Shouldn't be there
    
    resurrecter.init();
    const bindAppValue = function(key, value) {
	$scope.$applyAsync(function() {
		$scope[key] = value;
	    })
    };
    
    // Initialize counters for conversation (total and unread)                                 
    console.log(cacheCounters.query());
    // Preload the contact list                                                                       
    !$state.includes('secured.contacts') && contactCache.load();
    
    $scope.idDefined = function() {
	$state.params.id && $state.params.id.length > 0;
    }
    $scope.isMobile = function() {
	
    }
    $scope.$on('$destroy', function() {
      
	});
    
    initialization();
}
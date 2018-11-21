angular.module('webmail')
    .controller('SecuredController', SecuredController);
function SecuredController($rootScope, $scope, authentication) {
    
    function initialization() {                                                                                           
	authentication.fetchUserInfo().then(function(data) {
		data;
	    });
    }
    
    $scope.user = authentication.user;

    const setUserType = function() {
    };
    
    const bindAppValue = function(key, value) {
	$scope.$applyAsync(function() {
		$scope[key] = value;
	    })
    };
                                   
    $scope.idDefined = function() {

    }
    
    initialization();
}

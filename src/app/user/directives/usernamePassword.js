angular.module('webmail.user')
    .controller('UsernamePasswordController', ['$rootScope', '$scope', function($rootScope, $scope) {
		$scope.update = function() {       
		    $rootScope.password = $scope.password;
                };

            }])
    .directive('usernamePassword', function() {
	    return {
		replace: true,
		    scope: {
		    form: '=',
			model: '='
			},
		    templateUrl: 'user/directives/usernamePassword.html'
		    }
	});

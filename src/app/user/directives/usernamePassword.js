'use strict';

angular.module('webmail.user')

    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/usernamePassword', {
                        templateUrl: 'user/directives/usernamePassword.html',
                            controller: 'UsernamePasswordController'
                            });
            }])

    .controller('UsernamePasswordController', ['$rootScope', '$scope', function($rootScope, $scope) {
		$scope.update = function() {       
		    $rootScope.password = $scope.password;
                };

            }])
    .directive('usernamePassword', function() {
	    return {
		templateUrl: 'user/directives/usernamePassword.html'
		    }
	});

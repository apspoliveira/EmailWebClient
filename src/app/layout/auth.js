'use strict';

angular.module('webmail.authentication')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/auth', {
    templateUrl: 'layout/auth.html',
    controller: 'AuthController'
  });
}])

.controller('AuthController', [function() {

}])
    .directive('auth', function() {
	    return {
		templateUrl: 'layout/auth.html'
		    }
	});


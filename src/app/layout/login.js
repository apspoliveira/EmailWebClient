'use strict';

angular.module('login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'layout/login.html',
    controller: 'LoginController'
  });
}])

.controller('LoginController', [function() {

}])
.directive('login', function() {
	return {
	    templateUrl: 'layout/login.html'
		}
    });

'use strict';

angular.module('signup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'views/signup.html',
    controller: 'SignupController'
  });
}])

.controller('SignupController', [function() {

}]);

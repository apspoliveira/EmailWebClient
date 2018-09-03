'use strict';

angular.module('account', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account', {
    templateUrl: 'views/account.html',
    controller: 'AccountController'
  });
}])

.controller('AccountController', [function() {

}]);

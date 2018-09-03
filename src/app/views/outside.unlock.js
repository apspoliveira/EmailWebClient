'use strict';

angular.module('outside.unlock', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/outside.unlock', {
    templateUrl: 'views/outside.unlock.html',
    controller: 'OutsideUnlockController'
  });
}])

.controller('OutsideUnlockController', [function() {

}]);

'use strict';

angular.module('unlock', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/unlock', {
    templateUrl: 'views/unlock.html',
    controller: 'UnlockController'
  });
}])

.controller('UnlockController', [function() {

}]);

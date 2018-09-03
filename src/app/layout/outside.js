'use strict';

angular.module('outside', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/outside', {
    templateUrl: 'layout/outside.html',
    controller: 'OutsideController'
  });
}])

.controller('OutsideController', [function() {

}]);

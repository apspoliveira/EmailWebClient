'use strict';

angular.module('pre', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pre', {
    templateUrl: 'layout/pre.html',
    controller: 'PreController'
  });
}])

.controller('PreController', [function() {

}]);

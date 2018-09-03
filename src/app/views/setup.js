'use strict';

angular.module('setup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/setup', {
    templateUrl: 'views/setup.html',
    controller: 'SetupController'
  });
}])

.controller('SetupController', [function() {

}]);

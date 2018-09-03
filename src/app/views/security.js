'use strict';

angular.module('security', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/security', {
    templateUrl: 'views/security.html',
    controller: 'SecurityController'
  });
}])

.controller('SecurityController', [function() {

}]);

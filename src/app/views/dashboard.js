'use strict';

angular.module('dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'views/dashboard.html',
    controller: 'DashboardController'
  });
}])

.controller('DashboardController', [function() {

}]);

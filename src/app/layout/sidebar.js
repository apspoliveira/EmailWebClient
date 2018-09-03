'use strict';

angular.module('sidebar', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sidebar', {
    templateUrl: 'layout/sidebar.html',
    controller: 'SidebarController'
  });
}])

.controller('SidebarController', [function() {

}]);

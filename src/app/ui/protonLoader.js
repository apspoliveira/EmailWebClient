'use strict';

angular.module('protonLoader', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/protonLoader', {
    templateUrl: 'ui/protonLoader.html',
    controller: 'ProtonLoaderController'
  });
}])

.controller('ProtonLoaderController', [function() {

}]);
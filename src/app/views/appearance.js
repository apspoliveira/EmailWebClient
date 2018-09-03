'use strict';

angular.module('appearance', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/appearance', {
    templateUrl: 'views/appearance.html',
    controller: 'AppearanceController'
  });
}])

.controller('AppearanceController', [function() {

}]);

'use strict';

angular.module('base', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/base', {
    templateUrl: 'notifications/base.html',
    controller: 'BaseController'
  });
}])

.controller('BaseController', [function() {

}]);

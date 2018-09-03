'use strict';

angular.module('pgp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pgp', {
    templateUrl: 'views/pgp.html',
    controller: 'PgpController'
  });
}])

.controller('PgpController', [function() {

}]);

'use strict';

angular.module('domains', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/domains', {
    templateUrl: 'views/domains.html',
    controller: 'DomainsController'
  });
}])

.controller('DomainsController', [function() {

}]);

'use strict';

angular.module('webmail.user')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/base', {
    templateUrl: 'notifications/base.html',
    controller: 'BaseController'
  });
}])

.controller('BaseController', [function() {

}]);

'use strict';

angular.module('members', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/members', {
    templateUrl: 'views/members.html',
    controller: 'MembersController'
  });
}])

.controller('MembersController', [function() {

}]);

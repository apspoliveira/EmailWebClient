'use strict';

angular.module('outside.reply', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/outside.reply', {
    templateUrl: 'views/outside.reply.html',
    controller: 'OutsideReplyController'
  });
}])

.controller('OutsideReplyController', [function() {

}]);

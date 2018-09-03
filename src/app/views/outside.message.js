'use strict';

angular.module('outside.message', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/outside.message', {
    templateUrl: 'views/outside.message.html',
    controller: 'OutsideMessageController'
  });
}])

.controller('OutsideMessageController', [function() {

}]);

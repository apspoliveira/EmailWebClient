'use strict';

angular.module('message.print', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/message.print', {
    templateUrl: 'views/message.print.html',
    controller: 'MessagePrintController'
  });
}])

.controller('MessagePrintController', [function() {

}]);

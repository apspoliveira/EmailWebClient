'use strict';

angular.module('payments', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/payments', {
    templateUrl: 'views/payments.html',
    controller: 'PaymentsController'
  });
}])

.controller('PaymentsController', [function() {

}]);

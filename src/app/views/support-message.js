'use strict';

angular.module('support-message', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/support-message', {
    templateUrl: 'views/support-message.html',
    controller: 'SupportMessageController'
  });
}])

.controller('SupportMessageController', [function() {

}]);

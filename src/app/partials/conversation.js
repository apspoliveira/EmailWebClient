'use strict';

angular.module('conversation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/conversation', {
    templateUrl: 'partials/conversation.html',
    controller: 'ConversationController'
  });
}])

.controller('ConversationController', [function() {

}]);


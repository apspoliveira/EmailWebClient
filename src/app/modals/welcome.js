angular.module('modals.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/welcome', {
    templateUrl: 'modals/welcome.html',
    controller: 'WelcomeController'
  });
}])

.controller('WelcomeController', [function() {

}]);

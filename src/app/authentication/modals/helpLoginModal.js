angular.module('webmail.authentication')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/helpLoginModal', {
    templateUrl: 'authentication/modals/helpLoginModal.html',
    controller: 'helpLoginModalController'
  });
}])

.controller('helpLoginModalController', [function() {

}])
.directive('helpLoginModal', function() {
            return {
                templateUrl: 'authentication/modals/helpLoginModal.html'
                    }
        });


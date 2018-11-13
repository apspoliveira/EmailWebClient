angular.module('webmail.ui')

    .config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/headerNoAuth', {
    templateUrl: 'ui/header/headerNoAuth.html',
    controller: 'HeaderNoAuthController'
  });
}])

.controller('HeaderNoAuthController', [function() {

}])
.directive('headerNoAuth', function() {
   return {
       templateUrl: 'ui/header/headerNoAuth.html'
	   }
    });


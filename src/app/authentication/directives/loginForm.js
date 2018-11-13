angular.module('webmail.authentication')    
    .controller('LoginFormController', ['$scope', 'helpLogin', function($scope, help) {                                                                                         		
		$scope.helpLoginModal = function() {                                                             
		    help();
		};                                                                          
	    }])
    .directive('loginForm', function() {
            return {
		replace: true,
		    templateUrl: 'authentication/directives/loginForm.html'
                    }
        })
    .factory('helpLogin', ['$location', function($location) {                               
		return function() {
		    $location.path('/helpLoginModal');                                                      };                                                                         
	    }]);
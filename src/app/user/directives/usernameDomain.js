angular.module('webmail.user')
    .controller('UsernameDomainController', ['$rootScope', '$scope', function($rootScope, $scope) {

		$scope.domains = [{
			value: 1, 
			label: 'gmail.com'
		    }, {
			value: 2, 
			label: 'Yahoo Mail' 
		    }, {
			value: 3, 
			label: 'protonmail.com' 
		    }, {
			value: 4, 
			label: 'AOL Mail' 
		    }];
		
		$scope.update = function() {
                    //$scope.greeting = 'Hello';
                    $rootScope.username = $scope.username;                                               
		    $rootScope.domain = $scope.domain.label;
		};

            }])
    .directive('usernameDomain', function() {
	    return {
		replace: true, 
		    scope: {
		    form: '=',
			model: '=',
			domains: '='
                        },
		templateUrl: 'user/directives/usernameDomain.html'
		    }
	});

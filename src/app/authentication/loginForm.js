angular.module('webmail.authentication')

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/loginForm', {
    templateUrl: 'authentication/loginForm.html',
	      controller: 'LoginFormController'
	      });
	}])
    
    .controller('LoginFormController', ['$scope', 'helpLogin', function($scope, help) {                                                                                         		
		$scope.helpLoginModal = function() {                                                             
		    help();
		};                                                                          
	    }])
    .directive('loginForm', function() {
            return {
                templateUrl: 'authentication/loginForm.html'
                    }
        })
    .factory('helpLogin', ['$location', function($location) {                               
		return function() {
		    $location.path('/helpLoginModal');                                                      };                                                                         
	    }]);
/*
angular 
    .module('authentication', [])
    .controller('LoginController', ['$scope', 'helpLoginModal', function($scope, help) {
        $scope.master = {};

        $scope.helpLoginModal = function() {
            help();
        };

        $scope.update = function(user) {
            $scope.master = angular.copy(user);
        };
    
        $scope.reset = function() {
            $scope.user = angular.copy($scope.master);
        };               
    
        $scope.reset();
    }]).
    directive('loginForm', function() {
        return {
            replace: true,
            //templateUrl: 'templates/partials/conversation.template.html'
            templateUrl: 'templates/authentication/loginForm.template.html'
        }
    }).
    directive('account', function() {
        return {
            replace: true, 
            templateUrl: 'templates/account.template.html' 
        }
    });*/
    /*factory('helpLoginModal', function(pmModal) {
        return pmModal({
            controllerAs: 'ctrl',
            templateUrl: 'templates/helpLoginModal.template.html',
            controller: function(params) {
                this.cancel = params.close;
            }
        });
    });*/

    /*.controller('LoginController', LoginController)
    .directive('loginForm', loginForm) 
    .factory('helpLoginModal', helpLoginModal);*/

/*function helpLoginModal(pmModal) {
    return pmModal({
        controllerAs: 'ctrl',
        templateUrl: require('../../../templates/authentication/modals/helpModal.tpl.html'),
        controller: function(params) {
            this.cancel = params.close;
        }
    });
}*/

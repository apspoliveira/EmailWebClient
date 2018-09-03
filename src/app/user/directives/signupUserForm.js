angular.module('webmail.user', ['ngRoute', 'ngMessages', 'webmail.authentication', 'webmail.commons'])
    .config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/signupUserForm', {
			templateUrl: 'user/directives/signupUserForm.html',
			    controller: 'SignupUserFormController'
			    });
	    }])
    .controller('SignupUserFormController', SignupUserFormController)
    .directive('signupUserForm', signupUserForm);
           
signupUserForm.$inject = ['$window'];

function signupUserForm($window)
 {
 return {
		replace: true,
		scope: {
		    domains: '=',
		    plans: '=',
		    account: '='
		},
		//template: '<div>element</div>',
		templateUrl: 'user/directives/signupUserForm.html',
		link: function(scope, element) {
		    scope.name = 'Jeff';
		    console.log(scope);

		    const send = function() {
			console.log('send');

			// Save variables to prevent extensions/etc
			// from modifying them during setup process   
			signupModel.store(scope.account);
			
			$rootScope.$emit('signup', {
			    
			    data: {
				form: scope.account
			    }
			});

			console.log(scope.account)
			
			}

		    const onSubmit = function(e) {
			console.log('onSubmit');

			e.preventDefault();
			
			e.querySelector('.signUpProcess-btn-create')

			if (scope.accountForm.$invalid) {
			    return el[0].querySelector('.ng-invalid').focus();
			}

			if (scope.account.notificationEmail) {
			    return send();
			    }
		    };
		    
		    element.on('mousedown', function() {
			    $window.alert('mouse down');
			});
		    
		    element.on('submit', onSubmit);

		    console.log(element);
		
		    scope.$on('$destroy', function() {
			    element.off('submit', onSubmit);
			    });
		}
	    }
 };
 SignupUserFormController.$inject = ['$rootScope', '$scope', 'signupUserProcess', 'signupModel', 'passwords', 'authentication'];

    function SignupUserFormController($rootScope, $scope, signupUserProcess, signupModel, passwords, authentication) {
                                               
		$scope.createAccount = function() {
		    $rootScope.email = $scope.notificationEmail;

		    $scope.account = {
			username: $scope.username, // Prepopulate the username        
			domain: $scope.domain, // Select the domain    
			password: $scope.password,
			email: $scope.email
		    };

		    encrypted = passwords.encryptPassword($scope.password);

		    $scope.account.password = encrypted;

		    signupModel.store($scope.account);

		    signupUserProcess.createAccount($scope.account);
		};
    };

angular.module('webmail.user')
    .directive('signupUserForm', signupUserForm);

function signupUserForm($window)
 {
     const I18N = {
	 TITLE: 'Warning',
	 MESSAGE: 'Warning: You did not set a recovery email so account recovery is impossible if you forget your password. Proceed without recovery email?'
     }

     return {
	 replace: true,
	     scope: {
	     domains: '=',
		 plans: '=',
		 account: '='
		 },
	     templateUrl: 'user/directives/signupUserForm.html',
	     controller: 'SignupController',
	     link: function(scope, element) {

	     const send = function() {
			// Save variables to prevent extensions/etc
			// from modifying them during setup process   
			//signupModel.store(scope.account);
			
			$rootScope.$emit('signup', {
				
				data: {
				    form: scope.account
					}
			});

			//console.log(scope.account)
			
		    }

		    const onSubmit = function(e) {
			/*e.preventDefault();
			
			e.querySelector('.signUpProcess-btn-create')

			if (scope.accountForm.$invalid) {
			    return el[0].querySelector('.ng-invalid').focus();
			}

			if (scope.account.notificationEmail) {
			    //return send();
			    }*/
		    };
		    
		    element.on('mousedown', function() {
			   
			});
		    
		    element.on('submit', onSubmit);
		    
		    console.log(element);
		    
		    scope.$on('$destroy', function() {
			    element.off('submit', onSubmit);
			});
	 }
     }
 };
angular.module('webmail')
.directive('signupUserForm', function() {
	return {
	    templateUrl: 'templates/user/signupUserForm.html',                       
	    controller: 'SignupController'                    
	}
    })

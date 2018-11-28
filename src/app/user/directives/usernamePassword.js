angular.module('webmail')
    .directive('usernamePassword', function() {
	return {
	    templateUrl: 'templates/user/usernamePassword.html',
	    controller: 'SignupController'
	}
    });

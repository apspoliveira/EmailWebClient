angular.module('webmail')
    .directive('usernameDomain', function() {
	return {
	    templateUrl: 'templates/user/usernameDomain.html',
	    controller: 'SignupController'
	}
    });

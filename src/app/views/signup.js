angular.module('webmail.user')
    .directive('signup', signup);
function signup()
{
    return {
	replace: true,
	    scope: {
	    domains: '=',
		plans: '=',
		account: '='
                },
	    templateUrl: 'views/signup.html',
	    controller: 'SignupController'
	    }
}
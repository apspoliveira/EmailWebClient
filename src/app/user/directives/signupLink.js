angular.module('webmail.user')
    .directive('signupLink', signupLink);
function signupLink() {
    const I18N = {
	forFree: 'Sign up for free',
    default: 'Create Account',
	no: 'No'
    }

   
}
angular.module('webmail.ui')
    .directive('logo', logo);
function logo(authentication) {
    return {
	restrict: 'E',
	    templateUrl: 'ui/directives/logo.html',
	    replace: true,
	    link(scope, element) {

	    updateLogo();

            function updateLogo() {

		//const isSubuser = authentication.user.subuser;
		//const isMember = authentication.user.Role;
	    }
		    
	}
    }
}
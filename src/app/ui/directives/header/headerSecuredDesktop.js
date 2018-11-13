angular.module('webmail.ui')
    .directive('headerSecuredDesktop', headerSecuredDesktop);
function headerSecuredDesktop() {
    return {
	//controller: 'HeaderController',
	templateUrl: 'ui/directives/header/headerSecuredDesktop.html'
	    }
}
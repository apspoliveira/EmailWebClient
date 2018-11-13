angular.module('webmail.ui')
    .directive('headerSecured', headerSecured);
function headerSecured() {
    return {
	templateUrl: 'ui/header/headerSecured.html'
	    }
}
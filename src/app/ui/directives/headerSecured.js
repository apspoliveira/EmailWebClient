angular.module('webmail')
    .directive('headerSecured', headerSecured);
function headerSecured() {
    return {
	templateUrl: 'ui/header/headerSecured.html'
	    }
}

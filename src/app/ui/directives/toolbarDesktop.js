angular.module('webmail')
    .directive('toolbarDesktop', toolbarDesktop);
function toolbarDesktop() {
    return {
	replace: true,
	    templateUrl: 'ui/directives/toolbarDesktop.html',
	    link(scope) {
	}
    }
}

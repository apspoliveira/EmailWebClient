angular.module('webmail.sidebar')
    .directive('sidebarMobileHeader', sidebarMobileHeader);
function sidebarMobileHeader() {
    return {
	templateUrl: 'sidebar/directives/sidebarMobileHeader.html'
	    }
}
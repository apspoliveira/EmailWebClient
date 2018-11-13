angular.module('webmail.sidebar')
    .directive('sidebarMobile', sidebarMobile);
function sidebarMobile() {
    return {
	templateUrl: 'partials/sidebar-responsive.html'
    }
}
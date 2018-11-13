angular.module('webmail.sidebar')
    .directive('sidebar', sidebar);
function sidebar(sidebarModel) {
    return {
	scope: {},
	    replace: true,
	    templateUrl: 'partials/sidebar.html',
	    link(scope) {
	    scope.listStates = Object.keys(sidebarModel.getStateConfig());
	    console.log(listStates);
	}
    }
}
angular.module('webmail.squire')
    .directive('squireToolbar', squireToolbar);
function squireToolbar() {
    return {
	templateUrl: 'squire/directives/squireToolbar.html'
	    }
}
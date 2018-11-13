angular.module('webmail.conversation')
    .directive('listColumns', listColumns);
function listColumns() {
    return {
	replace: true,
	    templateUrl: 'partials/conversation-list-columns.html'
	    }
}
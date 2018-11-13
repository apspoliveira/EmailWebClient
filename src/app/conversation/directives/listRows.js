angular.module('webmail.conversation')
    .directive('listRows', listRows);
function listRows() {
    return {
	replace: true,
	    templateUrl: 'partials/conversation-list-rows.html'
	    }
}
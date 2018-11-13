angular.module('webmail.conversation')
    .directive('listMobile', listMobile);
function listMobile() {
    return {
	replace: true,
	    templateUrl: 'partials/conversation-list-mobile.html'
	    }
}
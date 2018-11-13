angular.module('webmail.message')
    .directive('messageView', messageView);
function messageView(cache) {
    return {
	restrict: 'E',
	    replace: true,
	    templateUrl: 'message/directives/messageView.html',
	    link(scope) {
	    
	    var unsubscribeActions = angular.noop;

	    scope.$on('move', function(e, mailbox) {
		    $rootScope.$emit('messageActions', {
			    type: 'move'
			});
		});
	}
    }
}
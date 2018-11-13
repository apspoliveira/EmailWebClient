angular.module('webmail.composer')
    .directive('btnSendMessage', btnSendMessage);
function btnSendMessage() {
    return {
	replace: true,
	    scope: {
            model: '=message'
		},
	    template: '<button class="btnSendMessage-btn-action"></button>',
	    link(scope, el) {
	    const isCurrentMsg = function(msg) {
		msg.ID === scope.model.ID;
	    }

	    const onClick = function() {
		
	    }
	    
	    el.on('click', onClick);
	
	    scope.$on('$destroy', function() {
		    el.off('click', onClick);
		});
	}
    }
}
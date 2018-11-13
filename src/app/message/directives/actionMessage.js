angular.module('webmail.message')
    .directive('actionMessage', actionMessage);
function actionMessage($rootScope) {
    return {
        link(scope, el, actionMessage, actionMessageType) {
	    function onClick() {
                switch (actionMessage) {
		case 'unread':
		    scope.$applyAsync(function() {
                            scope.message.expand = false;
                            scope.message.IsRead = 0;
                        });
		    break;
		case 'togglePlainHtml':
		    scope.$applyAsync(function() {
			});
		    break;
		case 'toggleDetails':
		    scope.$applyAsync(function() {
			});
		    break;
		case 'print':
		    const message = scope.message;
		    message.content = el
			.parents('.message')
			.get(0)
			.querySelector('.message-body-container').innerHTML;
		    break;
		case 'viewPgp':
		    const message = scope.message;
		    break;
		case 'downloadEml':
		    var { DecryptedBody = '', Header = '', Subject = '', Time } = scope.message;
		    break;
		default:
		    break;
		}
	    }
	}
    }
}
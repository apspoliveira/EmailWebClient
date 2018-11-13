angular.module('webmail.elements')
    .directive('elementView', elementView);
function elementView() {
    return {
	template: `
	    <conversation-view ng-if="type === 'conversation'"></conversation-view>
								     <message-view ng-if="type === 'message'"></message-view>`,
														    }
}
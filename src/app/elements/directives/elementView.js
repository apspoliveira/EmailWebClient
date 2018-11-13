angular.module('webmail.elements')
    .directive('elementView', elementView);
function elementView() {
    return {
	template: `
	    <conversation-view></conversation-view>
	    <message-view></message-view>
	    `,
	    link(scope) {
	    console.log(scope);
	}
    }
}
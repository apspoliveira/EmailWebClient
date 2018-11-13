angular.module('webmail.conversation')
    .directive('conversationView', conversationView);
function conversationView($state, $stateParams) {
    return {
	restrict: 'E',
	    template: '<div class="conversationView-container"><conversation data-conversation="conversation"></conversation></div>',
	    link(scope) {
	    console.log(scope);
	    const conversationID = $stateParams.id;
	    
	    function back() {
		const route = $state.$current.name.replace('.element', '');
		$state.go(route, { id: null });
	    }
	    
	    cache.getConversation(conversationID).then(function(conversation) {
		    const label = _.find(conversation.Labels, { ID });
		    
		    if (label || $state.includes('secured.search.**')) {
			return (scope.conversation = conversation);
		    }
		    
		    return back();
		});
	}
    }
}
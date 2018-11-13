angular.module('webmail.conversation')
    .directive('conversation', conversation);
function conversation($rootScope, cache) {
    return {
	scope: {
            conversation: '='
		},
	    templateUrl: 'partials/conversation.html',
	    link(scope) {
	    console.log(scope);
	    var messagesCached = [];
	    
	    var unsubscribeActions = angular.noop;
	    scope.messages = [];
	    scope.showTrashed = false;
            scope.showNonTrashed = false;
            $rootScope.numberElementSelected = 1;
            $rootScope.showWelcome = false;
            console.log($state);
	    scope.inTrash = $state.includes('secured.trash.**');
	    scope.inSpam = $state.includes('secured.spam.**');
            scope.getElements = function() {
		[scope.conversation];
	    }

	    /**                                                                                    
	     * Method call at the initialization of this directive                                    
	     */
            function initialization() {
		var messages = [];
		
		messagesCached = cache.queryMessageCached($stateParams.id);

	    }

	    scope.toggleOption = function(option) {
		scope[option] = !scope[option];
	    };
		
	    /**                                                                               
	     * @return {Boolean}                                                                
	     */
	    scope.showNotifier = function(folder) {
		console.log('show notifier');
		const filtered = _.filter(messagesCached, function (message) {
			_.includes(message.LabelIDs, MAILBOX_IDENTIFIERS[folder]);
		    });
		return filtered.length < messagesCached.length && filtered.length > 0;
	    };
	}
    }; 
}
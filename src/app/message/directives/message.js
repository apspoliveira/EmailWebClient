angular.module('webmail.message')
    .directive('message', message);

const CLASSNAME = {
    UNDISCLOSED: 'message-undisclosed'
};

const getRecipients = function(ToList, CCList, BCCList) {
    ToList.concat(CCList, BCCList);
};
    
const noRecipients = function(message) {
    !getRecipients(message).length;
};
    
function message($state, cache) {
    /**                                                                                               
     * Back to element list                                                                     
     */
    function back() {
        const route = $state.$current.name.replace('.element', '');
        $state.go(route, { id: null });
    }
    
    /**                                                                                                
     * Check if the message can be open for the current context                                 
     * @param {Array} [LabelIDs=[]}]                                                              
     * @return {Boolean}                                                                              
     */
    function canBeOpen(LabelIDs) {
        const condition = LabelIDs.indexOf(currentLocation) !== -1;
        const isSearch = $state.includes('secured.search.**');
        return type === 'conversation' || isSearch || condition;
    }

    return {
	restrict: 'E',
	    replace: true,
	    templateUrl: 'message/directives/message.html',
	    scope: {
            message: '=model',
		marked: '=',
		last: '=',
		index: '='
		},
	    link(scope, element) {
		const bindClasses = function(message) {
		    element[0].classList[noRecipients(message) ? 'add' : 'remove'](CLASSNAME.UNDISCLOSED);
		};
		
		bindClasses(scope.message);

		const loadMessageBody = function() {
		    return cache.getMessage(scope.message.ID).then(function(message) {
			    _.extend(scope.message, message);
			});
		}

		const updateMessage = function(promise) {
		    try {
			var { type, body } = promise;
			scope.$applyAsync(function() {
				scope.message.expand = true;
				scope.message.isPlain = type === 'plain';
				if (type && body) {
				    scope.message.viewMode = 'html';
				    scope.body = body;
				}
			    });
		    } catch (e) {
			console.error(e);
			$exceptionHandler(e);
			scope.$applyAsync(function() {
				scope.message.expand = true;
				scope.message.viewMode = 'plain';
				scope.message.hasError = true;
				scope.message.errorInfo = e;
			    });
		    }
		};

		const loadContent = function() {
		    updateMessage(displayContent(scope.message, scope.body, scope.index));
		}

		/**                                                                                
		 * Initialize the message                                                          
		 */
		scope.body = ''; // Here we put the content displayed inside the message content   
		
		function openMessage(expand) {
		    if (scope.message.Type === 1) {
			if ($state.includes('secured.drafts.**') || $state.includes('secured.allDrafts.**')) {
			 
			}
			return;
		    }
		    
		    // Default there is no expand, this key is coming from toggleMessage            
		    if (expand === false) {
			// Default are undefined, only bind the value if they were set.                       
			_.has(scope.message, 'showEmbedded') && (scope.message.showEmbedded = false);
			_.has(scope.message, 'showImages') && (scope.message.showImages = false);
			return;
		    }

		    const promise = typeof scope.message.Body === 'undefined' ? loadMessageBody() : Promise.resolve();

		    promise.then(loadContent).then(function() {
			    // Auto focus message list when we load the message, to allow keyboard srolling       
			    scope.$applyAsync(function() {
				    // If you switch to another conversation the container might not exist            
				    $(document.getElementById('pm_thread')).focus();
				});
			});
		}

		/**                                                                               
		 * User for dropdown-folders, return the current message model inside an array      
		 * @return {Array}                                                                   
		 */
		scope.getElements = function()  {
		    [scope.message];
		}

		/**                                                                                  
		 * Get all recipients                                                                 
		 * @return {Array} recipients                                                       
		 */
		scope.recipients = function() {
		    getRecipients(scope.message);
		}

		/**                                                                                 
		 * Check if there is no recipients                                                  
		 * @return {Boolean}                                                                
		 */
		scope.noRecipients = function() {
		    noRecipients(scope.message);
		}

		// TODO need review with label dropdown                                           
		scope.getMessage = function() { 
		    [scope.message];
		}

		/**                                                        
		 * Method call when the user submit some labels to apply to this message           
		 * @param {Array} labels                                                            
		 * @param {Boolean} alsoArchive                                                        
		 */
		scope.saveLabels = function(labels, alsoArchive) {
		    const messages = [scope.message];
		};
	    }
    }
}
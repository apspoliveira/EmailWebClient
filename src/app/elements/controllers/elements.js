angular.module('webmail.elements')
    .controller('ElementsController', ElementsController);
function ElementsController($log, $rootScope, $scope, $state, $stateParams, authentication, actionConversation, cache, mailSettingsModel) {
    var unbindWatcherElements;

    const NumMessagePerPage = mailSettingsModel.get();

    $scope.elementsLoaded = false;
    $scope.limitReached = false;
    $scope.conversations = [];
    
    /**                                                                                                
     * Method called at the initialization of this controller                                       
     */
    function initialization() {
        // Variables                                                                              
	$scope.markedElement = undefined;
	$scope.conversationsPerPage = NumMessagePerPage;
	$scope.selectedFilter = $stateParams.filter;
        $scope.selectedOrder = $stateParams.sort || '-date';
	$scope.startWatchingEvent();
	$scope.refreshElements().then(function() {
		$scope.$applyAsync(function() {
			$scope.selectElements('all', false);
		    }); // If we don't use the timeout, messages seems not available (to unselect for example)
		// I consider this trick like a bug in the angular application
	    }, $log.error);

	console.log($scope);
    }

    $scope.$on('$stateChangeSuccess', function() {
	    $scope.elementsLoaded = false;
	    $scope.limitReached = false;
	});
    
    /**                                                                                                
     * Check if we should display the component                                                        
     * @param {String} type                                                                            
     * @return {Boolean}                                                                                
     */
    const displayType = function (type) {
	console.log(type);
	var test = false;
	
	switch (type) {
	case 'rows': {
	    test = isRowsMode && !$scope.idDefined();
	    break;
	}

	case 'columns': {
	    test = isColumnsMode;
	    break;
	}

	case 'placeholder': {
	    const idDefined = $scope.idDefined();
	    const shouldDisplay = isColumnsMode && (!idDefined || (idDefined && $rootScope.numberElementChecked > 0));
	    test = shouldDisplay;
	    break;
	}

	case 'mobile': {
	    test = !$scope.idDefined();
	    break;
	}
        }

        return test;
    }

    $scope.startWatchingEvent = function() {
	var isOpened = !!$state.params.id;

	
    }

    /**                                                                                               
     * Go to the next conversation                                                                    
     */
    function nextElement() {
	const elementID = $state.params.id;

	const current = $state.$current.name;
	const elementTime = $scope.markedElement.Time;
	
	cache
	    .more(elementID, elementTime, 'next')
	    .then(function(element) {
		    const id = '';
		    if (conversationMode)
			id = conversationMode;
		    else if (element.ConversationID || element.ID)
			id = element.ConversationID || element.ID;
		    else 
			id = element.ID;
		    $state.go(current, { id });
		    $scope.markedElement = element;
		    !isRowMode 
		});
    }

    /**                                                                                               
     * Go to the previous conversation                                                                
     */
    function previousElement() {
	const elementID = $state.params.id;

	const current = $state.$current.name;
	const elementTime = $scope.markedElement.Time;

	 cache
	     .more(elementID, elementTime, 'previous')
	     .then(function(element) {
		     const id = '';
		     if (conversationMode)
			 id = conversationMode;
		     else if (element.ConversationID || element.ID)
			 id = element.ConversationID || element.ID;
		     else
			 id = element.ID;
		     $state.go(current, { id });
		     $scope.markedElement = element;
                    !isRowMode
			});
    }
   
    $scope.$on('nextElement', function() {
            nextElement();
        });

    $scope.$on('previousElement', function() {
            previousElement();
        });

    $scope.$on('$destroy', function() {
	
	});
    
    function getWildCard() {
        if (angular.isDefined($stateParams.wildcard)) {
            return $stateParams.wildcard;
        }

        const AutoWildcardSearch = mailSettingsModel.get();

        return AutoWildcardSearch;
    }

    function forgeRequestParameters(mailbox) {
	const params = {
            Page: (~~$stateParams.page || 1) - 1
        };

	console.log($stateParams);

	if (angular.isDefined($stateParams.filter)) {
            params.Unread = +($stateParams.filter === 'unread'); // Convert Boolean to Integer         
	}

	console.log(params);
	
	if (angular.isDefined($stateParams.sort)) {
	    var sort = $stateParams.sort;
            const desc = sort.charAt(0) === '-';

            if (desc === true) {
                sort = sort.slice(1);
            }

            params.Sort = $filter('capitalize')(sort);
            params.Desc = +desc;
	}

	if (mailbox === 'search') {
            params.Address = $stateParams.address;
            params.Label = $stateParams.label;
            params.Keyword = $stateParams.keyword;
            params.To = $stateParams.to;
            params.From = $stateParams.from;
            params.Subject = $stateParams.subject;
            params.Begin = $stateParams.begin;
            params.End = $stateParams.end;
            params.Attachments = $stateParams.attachments;
            params.AutoWildcard = getWildCard();
        } else if (mailbox === 'label') {
            params.Label = $stateParams.label;
        } else {
            params.Label = MAILBOX_IDENTIFIERS[mailbox];
        }
	
	console.log(params);
	return params;
    }

    $scope.refreshElements = function() {
	$scope.mailbox = 'inbox';
	const request = forgeRequestParameters($scope.mailbox);
	console.log(request);

	const type = 'message';

	const promise;

	if (type === 'message')
	    promise = cache.queryMessages(request);
	else 
	    promise = cache.queryConversations(request);
	
	console.log(promise);
    
	return promise.then(function(elements) {
		
		const page = ~~$stateParams.page || 0;
		const selectedMap = $scope.conversations.reduce(function(map, element) {
			if (element.Selected) {
			    map[element.ID] = element;
			}
			return map;
		    });

		$scope.$applyAsync(function() {
			const previousConversations = angular.copy($scope.conversations);
			
			$scope.elementsLoaded = true;
			$scope.conversations = elements.map(function(element) {
				element.Selected = typeof selectedMap[element.ID] !== 'undefined';
				return element;
			    });

			watchElements();
			
			/**                                                                        
			 * Redirect the user if there are no elements to display for the current state
			 */
			if ($scope.conversations.length === 0 && page > 0) {
			    return $scope.back();
			}
			
			
			if ($scope.conversations.length > 0) {
			    var element;
			    
			    if (!$scope.markedElement) {
				if ($state.params.id) {
				    
				} else {
				    const found = _.find($scope.conversation, { ID: $scope.markedElement.ID });
				    if (found) {
					element = found;
				    } else {
			
				    }
				}
				
				$scope.markedElement = element;
			    }
			}
		    })
		    return elements;
	    });
    }

    /**                                                                                                
     * Return if the current element is active                                                    
     * @param {Object} element                                                                     
     * @return {Boolean}                                                                          
     */
    $scope.active = function(element) {
        if ($rootScope.numberElementChecked === 0 && angular.isDefined($state.params.id)) {
            return $state.params.id === element.ConversationID || $state.params.id === element.ID;
        }

        return false;
    };

    
    $scope.hasLabels = function(LabelIDs) { 
	LabelIDs.length || Labels.length;
    }

    $scope.hasAttachments = function(element) {
        if (element.ConversationID) {
            // is a message                                                                   
	    return element.NumAttachments > 0;
        }
        // is a conversation                                                                      
	return element.ContextNumAttachments > 0;
    };

    $scope.isRead = function(element) {
        if (element.ConversationID) {
            // is a message                                                                       
	    return element.IsRead === 1;
        }
        // is a conversation                                                                         
	return element.ContextNumUnread === 0;
    };

    $scope.isDisabled = function() {
        if ($scope.markedElement) {
            return false;
        }

        return !$rootScope.numberElementChecked && !angular.isDefined($state.params.id);
    };

    /**                                                                                            
     * Return [Element] selected                                                                     
     * @param {Boolean} includeMarked                                                              
     * @return {Array} elements                                                                     
     */
    function getElementsSelected(includeMarked) {
	console.log($scope);                                                         
	
	const elements = _.filter($scope.conversations, { Selected: true });
	
	if (!elements.length && $scope.markedElement && includeMarked) {
	    return _.filter(conversations, function(ID, ConversationID) { 
		    ID === $scope.markedElement.ID || ConversationID === $scope.markedElement.ID;
		});
	}

	console.log(elements);
        return elements;
    }

    /**                                                                                                
     * Return [IDs]                                                                                   
     * @return {Array}                                                                                
     */
    function idsSelected() {
        return _.map(getElementsSelected(), 'ID');
    }

    /**                                                                                                
     * Get type of the elements selected                                                               
     * @return {String}                                                                               
     */
    function getTypeSelected() {
        const elementsSelected = getElementsSelected();

        if (elementsSelected.length) {
            //return 
	    if(elementsSelected[0].ConversationID)
		return 'message';
	    else 
		return 'conversation';
        }
	return 'conversation';
    }

    $scope.read = function() {
	console.log('read element');

        const type = getTypeSelected();
        const ids = idsSelected();

        console.log(type);
	console.log(ids);

	if (type === 'conversation') {
            actionConversation.read(ids);
        } else if (type === 'message') {
           
        }
    };

    $scope.delete = function() {
       
    };

    /**                                                                                               
     * Move conversation to an other location                                                      
     * @param {String} mailbox                                                                     
     */
    $scope.move = function(mailbox, folderID) {
	console.log(mailbox);
	console.log(folderID);
	
	const type = getTypeSelected();
	console.log(type);
	const ids = idsSelected();
	console.log(ids);
        const labelID = folderID || MAILBOX_IDENTIFIERS[mailbox];
	console.log(labelID);

        $rootScope.numberElementChecked = 0;

        if (type === 'conversation') {
	    actionConversation.move(ids, labelID);
        } else if (type === 'message') {
     
	}
    };

    $scope.getElements = function() {
	getElementsSelected();
    }

    /**                                                                                              
     * back to conversation / message list                                                            
     * Or to the previous page.                                                                       
     * @param refresh Boolean refresh the current state without it's id if true                        
     */
    $scope.back = function(refresh) {
        const route = $state.$current.name.replace('.element', '');

	console.log(route);

	console.log(refresh);
	
        if (refresh) {
            const opt = _.extend({}, $stateParams, { id: null });
            return $state.go(route, opt);
        }
	
	console.log($stateParams);
	
        $state.go(route, {
		id: null,
		page: ~~$stateParams.page || 1,
		label: $stateParams.label
	    });
    };
	
    // Call initialization                                                                       
    initialization();
}
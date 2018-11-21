angular.module('webmail')
    .controller('ElementsController', ElementsController);
function ElementsController($rootScope, $scope, authentication, actionConversation, cache) {
    var unbindWatcherElements;

    $scope.elementsLoaded = false;
    $scope.limitReached = false;
    $scope.conversations = [];
    
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
		    }); 
	    });

    }

    const displayType = function (type) {
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

    }

    function nextElement() {
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
		    $scope.markedElement = element;
		    !isRowMode 
		});
    }

    function previousElement() {
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

    function forgeRequestParameters(mailbox) {
	const params = {
            Page: (1) - 1
        };

	if (angular.isDefined($stateParams.sort)) {
            const desc = sort.charAt(0) === '-';

            if (desc === true) {
                sort = sort.slice(1);
            }

            params.Sort = $filter('capitalize')(sort);
            params.Desc = +desc;
	}

	if (mailbox === 'search') {
           
        } else if (mailbox === 'label') {
          
        } else {
            params.Label = MAILBOX_IDENTIFIERS[mailbox];
        }
	
	return params;
    }

    $scope.refreshElements = function() {
	$scope.mailbox = 'inbox';
	const request = forgeRequestParameters($scope.mailbox);

	const type = 'message';

	const promise;

	if (type === 'message')
	    promise = cache.queryMessages(request);
	else 
	    promise = cache.queryConversations(request);
    
	return promise.then(function(elements) {
		
		const page = 0;
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

    $scope.active = function(element) {
        if ($rootScope.numberElementChecked === 0) {
            return element.ConversationID;
        }

        return false;
    };

    
    $scope.hasLabels = function(LabelIDs) { 
	LabelIDs.length || Labels.length;
    }

    $scope.hasAttachments = function(element) {
        if (element.ConversationID) {                                                          
	    return element.NumAttachments > 0;
        }
                                                                 
	return element.ContextNumAttachments > 0;
    };

    $scope.isRead = function(element) {
        if (element.ConversationID) {
                                                                   
	    return element.IsRead === 1;
        }
                                                                   
	return element.ContextNumUnread === 0;
    };

    $scope.isDisabled = function() {
        if ($scope.markedElement) {
            return false;
        }

        return !$rootScope.numberElementChecked;
    };

    function getElementsSelected(includeMarked) {
	const elements = _.filter($scope.conversations, { Selected: true });
	
	if (!elements.length && $scope.markedElement && includeMarked) {
	    return _.filter(conversations, function(ID, ConversationID) { 
		    ID === $scope.markedElement.ID || ConversationID === $scope.markedElement.ID;
		});
	}

        return elements;
    }

    function idsSelected() {
        return _.map(getElementsSelected(), 'ID');
    }

    function getTypeSelected() {
        const elementsSelected = getElementsSelected();

        if (elementsSelected.length) {
	    if(elementsSelected[0].ConversationID)
		return 'message';
	    else 
		return 'conversation';
        }
	return 'conversation';
    }

    $scope.read = function() {
        const type = getTypeSelected();
        const ids = idsSelected();

	if (type === 'conversation') {
            actionConversation.read(ids);
        } else if (type === 'message') {
           
        }
    };

    $scope.delete = function() {
       
    };

    $scope.move = function(mailbox, folderID) {
	const type = getTypeSelected();
	const ids = idsSelected();
        const labelID = folderID || MAILBOX_IDENTIFIERS[mailbox];

        $rootScope.numberElementChecked = 0;

        if (type === 'conversation') {
	    actionConversation.move(ids, labelID);
        } else if (type === 'message') {
     
	}
    };

    $scope.getElements = function() {
	getElementsSelected();
    }

    $scope.back = function(refresh) {

    };
	
    initialization();
}

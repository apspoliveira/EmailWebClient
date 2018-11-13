angular.module('webmail.conversation')
    .factory('cache', cache);
function cache($rootScope, conversationApi, messageApi) {
    const api = {};
    var messagesCached = []; // In this array we store the messages cached    
    var conversationsCached = []; // In this array we store the conversations cached   
    const dispatcher = [];
    const timeCached = {};
    const INVALID_SEARCH_ERROR_CODE = 15225;
    
    var { inbox, allDrafts, drafts, allSent, sent, trash, spam, allmail, archive, starred } = MAILBOX_IDENTIFIERS;
    
    const I18N = {
        errorMessages: 'No messages available',
        errorConversations: 'No conversations available'
    };

    const dispatchElements = function(type, data) {
	$rootScope.$emit('elements', { });
    }
    
    api.getDispatcher = function() { 
	Promise.all(dispatcher);
    }
    
    api.clearDispatcher = function () {
	(dispatcher.length = 0);
    }
    
    /**                                                                                           
     * Save conversations in conversationsCached and add loc in attribute                          
     * @param {Array} conversations                                                              
     */
    function storeConversations(conversations) {
        conversations.forEach(updateConversation);
    }
    
    /**                                                                                                  
     * From the request API we return an array of the pages cached                                      
     * @param {Number} Page                                                                            
     * @param {Number} Limit                                                                         
     * @return {Array}                                                                                  
     */
    function getPages(Page, Limit) {
	_.range(Page, Page + Limit / ELEMENTS_PER_PAGE, 1);
    }

    /**                                                                                                 
     * Save messages in cache                                                                         
     * @param {Array} messages                                                                        
     */
    function storeMessages(messages) {
        messages.forEach(updateMessage);
    }

    /**                                                                                              
     * Store time for conversation per location                                                    
     * @param {String} conversationId                                                                  
     * @param {String} loc                                                                           
     * @param {Integer} time                                                                          
     */
    function storeTime(conversationId, loc, time) {
        timeCached[conversationId] = timeCached[conversationId] || {};
        timeCached[conversationId][loc] = time;
    }
    
    /**                                                                                              
     * Update message cached                                                                         
     * @param {Object} message                                                                         
     */
    function updateMessage(message, isSend) {
	const current = _.find(messagesCached, { ID: message.ID });
	
	if (current) {
            messagesCached = _.map(messagesCached, function(msg) {

		});
	} else {
	
	}

	$rootScope.$emit('labelsElement.');
	$rootScope.$emit('foldersMessage.');
	$rootScope.$emit('foldersElement.');
    }

    /**                                                                                                
     * Refresh the list of senders for a conversation                                                
     * The current does not contain the previous list, so we need to                                 
     * merge them.                                                                                    
     * @param {Array} previous Previous list of senders                                              
     * @param {Array} current Current list of senders                                                
     * @return {Array}      Current list                                                              
     */
    const filterSenderConversation = function(previous, current) {

    }

    /**                                                                                                 
     * Search context datas to update the conversation                                              
     * @param {Object} oldElement                                                                    
     * @param {Object} newElement                                                                     
     * @return {Object}                                                                               
     */
    function extractContextDatas(oldElement, newElement) {
	
    }

    /**                                                                                                 
     * Update conversation cached                                                                  
     * @param {Object} conversation                                                                   
     */
    function updateConversation(conversation) {
	const current = _.find(conversationsCached, { ID: conversation.ID });
	
	if (current) {

	    $rootScope.$emit('labelsElement.' + current.ID, current);
	    $rootScope.$emit('foldersElement.' + current.ID, current);
	    return;
	}

	$rootScope.$emit('labelsElement.' + conversation.ID, conversation);
	$rootScope.$emit('foldersElement.' + conversation.ID, conversation);
    }

    /**                                                                                               
     * Return a vector to calculate the counters                                                     
     * @param {Object} element - element to analyse (conversation or message)                        
     * @param {Boolean} unread = true if unread case                                                 
     * @param {String} type = conversation or message                                                 
     * @return {Object}                                                                               
     */
    function vector(LabelIDs, Labels, isRead, unread, type) {
	

    }

    /**                                                                                              
     * Update time for conversation                                                                  
     * @param {String} conversationID                                                            
     */
    function manageTimes(conversationID) {
	if (!conversationID) {
            return;
        }
	
	const messages = api.queryMessagesCached(conversationID); // messages are ordered by -Time  
    }

    /**                                                                                                
     * Return loc specified in the request                                                             
     * @param {Object} request                                                                        
     * @return {String} loc                                                                            
     */
    const getLocation = function( Label) { 
	Label;
    }

    /**                                                                                                
     * Call API to get the list of conversations                                                       
     * @param {Object} request                                                                        
     * @return {Promise}                                                                               
     */
    function queryConversations(request, noCacheCounter) {
	console.log(request);
	
	const loc = getLocation(request);
	request.Limit = request.Limit || CONVERSATION_LIMIT; //We don't call 50 conversations but 100 to improve user experience when he deleted message and dislay quickly the next conversations  
	 const promise =
	     conversationApi.query()
	     .then(function(data) {
		     console.log(data);
		 })
	     .then(function(data) {
			 $rootScope.$emit('elements', { type: 'setLimit', data: { limit: data.Limit, total: data.Total } });
			 _.each(data.Conversations, function(conversation) {
				 conversation.loaded = true; // Mark these conversations as loaded   
			     });
			 
			 // Only for cache context                                
			 if (context) {
			     // Set total value in cache                                                           
			     if (!noCacheCounter) {
				 const total = data.Limit;
				 const unread;
				 if (total === 0)
				     unread = 0;
				 else 
				     unread = data.Unread;
				 
				 // Store conversations                                                  
				 storeConversations(data.Conversations);
				 
				 api.clearDispatcher();
				 // Return conversations ordered                                                       
				 return api.orderConversation(data.Conversations.slice(0, ELEMENTS_PER_PAGE), loc);
			     }
			     api.clearDispatcher();
			     return data.Conversations.slice(0, ELEMENTS_PER_PAGE);
			 }
		 })
		     .catch(function(data) {
			     api.clearDispatcher();
			     $rootScope.$emit('elements', { type: 'error', data: { code: data.Code, error: data.Error } });
			     throw new Error(data.Error || I18N.errorConversations);
			 });
	
	console.log(promise);
	return promise;
    }
    
    /**                                                                                                
     * Query api to get messages                                                                    
     * @param {Object} request                                                                      
     * @return {Promise}                                                                              
     */
    function queryMessages(request, noCacheCounter) {
	console.log(request);
	const loc = getLocation(request);

	request.Limit = request.Limit || MESSAGE_LIMIT; // We don't call 50 messages but 100 to improve user experience when he deleted message and display quickly the next messages    

	console.log(request);

	const promise = messageApi.query();

	console.log(promise);
	
	return promise;
    }

    /**                                                                                            
     * Get conversation from back-end and store it in the cache                                     
     * @param {String} conversationID                                                               
     * @return {Promise}                                                                            
     */
    function getConversation(conversationID) {
	console.log('get conversation');

	const promise = conversationApi.get(conversationID).then(function(data) {
		const Conversation = data;
		const Messages = data;
		const conversation = Conversation;
		const messages = Messages;
		const message = _.maxBy(messages, function(Time) {
			Time;
		    });// NOTE Seems wrong, we should check Time and LabelIDs                
		message.forEach(function(message) { 
			(message.loaded = true);
		    });
		conversation.loaded = true;
		conversation.Time = message.Time;
		storeConversations([conversation]);
		
		return angular.copy(conversation);
	    });
	
	console.log(promise);
	return promise;
    }

    /**                                                                                              
     * Return a list of conversations reordered by Time for a specific location                    
     * @param {Array} conversations                                                                 
     * @param {String} loc                                                                         
     * @return {Array} don't miss this array is reversed                                           
     */
    api.orderConversation = function(conversations, loc) {
        return reverse(
		       conversations.sort(function(a, b) {
			       if (api.getTime(a.ID, loc) < api.getTime(b.ID, loc)) {
				   return -1;
			       }
			       
			       if (api.getTime(a.ID, loc) > api.getTime(b.ID, loc)) {
				   return 1;
			       }
			       
			       if (a.Order < b.Order) {
				   return -1;
			       }
			       
			       if (a.Order > b.Order) {
				   return 1;
			       }

			       return 0;
			   })
		       );
    };

    function reverse(list) {
        return _.reduce(list, function(acc, item) {
		(acc.unshift(item), acc), [];
	    });
    }

    /**                                                                                             
     * Return a list of messages reordered by Time                                                   
     * @param {Array} messages                                                                       
     * @return {Array} don't miss this array is reversed                                            
     */
    api.orderMessage = function(messages, doReverse) {
	const list = messages.sort(function(a, b) {
		if (a.Time < b.Time) {
		    return -1;
		}

		if (a.Time > b.Time) {
		    return 1;
		}

		if (a.Order < b.Order) {
		    return -1;
		}

		if (a.Order > b.Order) {
		    return 1;
		}

		return 0;
	    });
	
	return doReverse ? reverse(list) : list;
    }

    /**                                                                                      
     * Return time for a specific conversation and location                                         
     * @return {Integer}                                                                             
     */
    api.getTime = function(conversationId, loc) {
        if (timeCached[conversationId] && angular.isNumber(timeCached[conversationId][loc])) {
            return timeCached[conversationId][loc];
        }
        return (api.getConversationCached(conversationId)).ContextTime || '';
    };

    /**                                                                                            
     * Return message list                                                                         
     * @param {Object} request                                                                      
     * @return {Promise}                                                                           
     */
    api.queryMessages = function(request) {
	const loc = getLocation(request);
	const page = request.Page || 0;
	
	const start = page * ELEMENTS_PER_PAGE;
	const end = start + ELEMENTS_PER_PAGE;
	var total;
	var number;
	const mailbox = 'inbox';

	var messages = _.filter(messagesCached, function(Labels, ID) {
		_.find(Labels, { ID: loc })
	    });
	console.log(messages);

	switch (mailbox) {
	case 'label':
	    break;
	default:
	    break;
	}

	if (angular.isDefined(total)) {
	    if (total === 0) {
		number = 0;
	    } else if (total % ELEMENTS_PER_PAGE === 0) {
		number = ELEMENTS_PER_PAGE;
	    } else if (Math.ceil(total / ELEMENTS_PER_PAGE) - 1 === page) {
		number = total % ELEMENTS_PER_PAGE;
	    } else {
		number = ELEMENTS_PER_PAGE;
	    }

	    messages = messages.slice(start, end);

	    // Supposed total equal to the total cache'                                               
	    if (messages.length === number) {
		return Promise.resolve(messages);
	    }
	}
	
	return queryMessages(request);
    }

    /**                                                                                                
     * Return conversation list with request specified in cache or call api                            
     * @param {Object} request                                                                        
     * @return {Promise}                                                                           
     */
    api.queryConversations = function(request) {
	const loc = getLocation(request);
	console.log(loc);

	const page = request.Page || 0;

	// In cache context?  
	
	const start = page * ELEMENTS_PER_PAGE;
	const end = start + ELEMENTS_PER_PAGE;
	var total;
	var number;

	const mailbox = 'inbox';
	var conversations = _.filter(conversationsCached, function(Labels, ID) {
		_.find(Labels, { ID: loc }) && api.getTime(ID, loc)
	    });
	console.log(conversations);
     
	switch (mailbox) {
	case 'label':
	    break;
	default:
	    break;
	}
	
	if (angular.isDefined(total)) {
	    if (total === 0) {
		number = 0;
	    } else if (total % ELEMENTS_PER_PAGE === 0) {
		number = ELEMENTS_PER_PAGE;
	    } else if (Math.ceil(total / ELEMENTS_PER_PAGE) - 1 === page) {
		number = total % ELEMENTS_PER_PAGE;
	    } else {
		number = ELEMENTS_PER_PAGE;
	    }
	
	    // Supposed total equal to the total cache?                                               
	    if (conversations.length === number) {
		return Promise.resolve(conversations);
	    }   
	}
	
	// Need data from the server                                                                  
	return queryConversations(request);
    } 

    /**                                                                                             
     * Return a copy of messages catched for a specific ConversationID                             
     * @param {String} conversationID                                                                
     */
    api.queryMessagesCached = function(ConversationID) {
	const list = api.orderMessage(_.filter(messagesCached, { ConversationID }));
	return list.map(messageModel);
    }
    
    /**                                                                                            
     * Return conversation cached                                                                    
     * @param {String} conversationId                                                                 
     * @return {Object}                                                                               
     */
    api.getConversationCached = function(ID) { 
	angular.copy(_.find(conversationsCached, ID));
    }

    /**                                                                                                
     * Return previous ID of message specified                                                        
     * @param {String} elementID - can be a message ID or a conversation ID                         
     * @param {Integer} elementTime - UNIX timestamp of the current element                       
     * @param {String} action - 'next' or 'previous'                                                
     * @param {String} type - 'conversation' or 'message'                                             
     * @return {Promise}                                                                              
     */
    api.more = function(elementID, elementTime, action) {
	const noCacheCounter = true;

	
	
    }

    return api;
}
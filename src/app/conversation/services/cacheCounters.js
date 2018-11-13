angular.module('webmail.conversation')
    .factory('cacheCounters', cacheCounters);
function cacheCounters (messageApi, conversationApi, $q, labelsModel, authentication) {
    const api = {};
    var counters = {};
    
    const inbox = MAILBOX_IDENTIFIERS.inbox;
    const allDrafts = MAILBOX_IDENTIFIERS.allDrafts;
    const drafts = MAILBOX_IDENTIFIERS.drafts;
    const allSent = MAILBOX_IDENTIFIERS.allSent;
    const sent = MAILBOX_IDENTIFIERS.sent;
    const trash = MAILBOX_IDENTIFIERS.trash;
    const spam = MAILBOX_IDENTIFIERS.spam;
    const allmail = MAILBOX_IDENTIFIERS.allmail;
    const archive = MAILBOX_IDENTIFIERS.archive;
    const starred = MAILBOX_IDENTIFIERS.starred;
    
    const exist = function(loc) {
        if (angular.isUndefined(counters[loc])) {
            counters[loc] = {
                message: {
                    total: 0,
                    unread: 0
                },
                conversation: {
                    total: 0,
                    unread: 0
                }
            };
        }
    };
    
    /**                                                                                                
     * Query unread and total                                                                       
     * Find the total and unread items per message and conversation                                 
     * @return {Promise}                                                                               
     */
    api.query = function() {
	const locs = [inbox, allDrafts, drafts, allSent, sent, trash, spam, allmail, archive, starred];
	
	// Initialize locations
	locs.forEach(exist);
	
	return $q
	.all({
		message: messageApi.count(),
		    conversation: conversationApi.count()
		    })
	.then(function({message, conversation}) {
		for (var i = 0; i < message.data.Counts.length; i++) {
		    if (counters[i] != undefined) {
			counters[i].message.total = message.data.Counts[i].Total;
			counters[i].message.unread = message.data.Counts[i].Unread;
		    }
		}
		for (var i = 0; i < conversation.data.Counts.length; i++) {
                    if (counters[i] != undefined) {
                        counters[i].conversation.total = conversation.data.Counts[i].Total;
                        counters[i].conversation.unread = conversation.data.Counts[i].Unread;
                    }   
		}
		console.log(counters);
	    });
    }
    
    /**                                                                                                
     * Add a new location                                                                             
     * @param {String} loc                                                                            
     */
    api.add = function(loc) {
	exist(loc);
    }
    
    /**                                                                                          
     * Update the total / unread for a specific loc                                                
     * @param {String} loc                                                                          
     * @param {Integer} total                                                                       
     * @param {Integer} unread                                                                   
     */
    api.updateMessage = function(loc, total, unread) {
        exist(loc);
        if (angular.isDefined(total)) {
            counters[loc].message.total = total;
        }
        if (angular.isDefined(unread)) {
            counters[loc].message.unread = unread;
        }
    };
    
    /**                                                                                             
     * Update the total / unread for a specific loc                                                
     * @param {String} loc                                                                        
     * @param {Integer} total                                                                       
     * @param {Integer} unread                                                                      
     */
    api.updateConversation = function(loc, total, unread) {
        exist(loc);
        if (angular.isDefined(total)) {
            counters[loc].conversation.total = total;
        }
        if (angular.isDefined(unread)) {
            counters[loc].conversation.unread = unread;
        }
    };
    
    /**                                                                                           
     * Get the total of messages for a specific loc                                                
     * @param {String} loc                                                                           
     */
    api.totalMessage = function(loc) {
        return counters[loc] && counters[loc].message && counter[loc].message.total;
    };
    
    /**                                                                                              
     * Get the total of conversation for a specific loc                                       
     * @param {String} loc                                                                         
     */
    api.totalConversation = function(loc) {
        return counters[loc] && counters[loc].conversation && counters[loc].conversation.total;
    };
    
    /**                                                                                             
     * Get the number of unread messages for the specific loc                                       
     * @param {String} loc                                                                        
     */
    api.unreadMessage = function(loc) {
        return counters[loc] && counters[loc].message && counters[loc].message.unread;
    };
    
    /**                                                                                               
     * Get the number of unread conversation for the specific loc                                   
     * @param {String} loc                                                                          
     */
    api.unreadConversation = function(loc) {
        return counters[loc] && counters[loc].conversation && counters[loc].conversation.unread;
    };
    
    api.reset = function() {
        counters = {};
    };
    
    api.currentState = function(value) {
        counters.CURRENT_STATE_VALUE = value;
    };
    
    api.getCurrentState = function() {
	counters.CURRENT_STATE_VALUE || 0;
    }
    
    api.getCounter = function(location) {
	counters[location];
    }
    
    return api;
}
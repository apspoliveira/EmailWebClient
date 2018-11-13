angular.module('webmail.message')
    .factory('messageApi', messageApi);
function messageApi($http, url) {
    const requestURL = url.build('messages');

    /**                                                                                               
     * Send a message                                                                               
     * @param {Object} params                                                                       
     * @return {Promise}                                                                            
     */
    const send = function(params) {
	console.log(params);
        return $http.post(url.build('messages/'+params.id), params); // send
    };
    
    /**                                                                                           
     * Create a new draft message                                                                   
     * @param {Object} params                                                                       
     * @return {Promise}                                                                             
     */
    const createDraft = function(params) {
	console.log(params);
	return $http.post(url.build('messages/draft'), params);
    }

    /**                                                                                              
     * Get message                                                                                  
     * @param {String} messageID                                                                     
     * @return {Promise}                                                                             
     */
    const get = function(messageID) {
	return $http.get(url.build('messages/'+messageID));
    }

    /**                                                                                             
     * Get a list of message metadata                                                               
     * @param {Object} params                                                                        
     * @return {Promise}                                                                               
     */
    const query = function(params) {
        console.log(params);
        console.log($http.defaults);
        return $http.get(requestURL, params);
    }

    /**                                                                                             
     * Get grouped message count                                                                     
     * @return {Promise}                                                                              
     */
    const count = function() {
	return $http.get(url.build('messages/count'));
    }

    /**                                                                                              
     * Update a draft message                                                                       
     * @param {Object} params                                                                        
     * @return {Promise}                                                                              
     */
    const updateDraft = function(params) {
	console.log(params);
	const messageID = params.ID || params.id;
        return $http.put(url.build('messages/draft/'+messageID), params);
    }

    /**                                                                                             
     * Mark an array of messages as starred                                                         
     * @param {Object}                                                                              
     * @return {Promise}                                                                             
     */
    const star = function(params) {
	return $http.put(url.build('messages/star'), params);
    }

    /**                                                                                           
     * Mark an array of messages as unstarred                                                     
     * @param {Object}                                                                             
     * @return {Promise}                                                                               
     */
    const unstar = function(params) {
	return $http.put(url.build('messages/unstar'), params);
    }

    /**                                                                                              
     * Mark an array of messages as read                                                            
     * @param {Object}                                                                               
     * @return {Promise}                                                                              
     */
    const read = function(params) {
	return $http.put(url.build('messages/read'), params);
    }

    
    /**                                                                                             
     * Mark an array of messages as unread                                                           
     * @param {Object}                                                                              
     * @return {Promise}                                                                              
     */
    const unread = function(params) {
	return $http.put(url.build('messages/unread'), params);
    }

    /**                                                                                              
     * Move an array of messages to trash                                                           
     * @param {Object}                                                                               
     * @return {Promise}                                                                               
     */
    const trash = function(params) {
	return $http.put(url.build('messages/trash'), params);
    }

    /**                                                                                                
     * Move an array of messages to inbox                                                              
     * @param {Object}                                                                                 
     * @return {Promise}                                                                               
     */
    const inbox = function(params) {
	return $http.put(url.build('messages/inbox'), params);
    }

    /**                                                                                             
     * Move an array of messages to spam                                                            
     * @param {Object}                                                                               
     * @return {Promise}                                                                            
     */
    const spam = function(params) {
	return $http.put(url.build('messages/spam'), params);
    }


    /**                                                                                              
     * Move an array of messages to archive                                                          
     * @param {Object} params                                                                         
     * @return {Promise}                                                                              
     */
    const archive = function(params) {
	return $http.put(url.build('messages/archive'), params);
    }

    /**                                                                                               
     * Delete an array of messages                                                                   
     * @param {Object} params                                                                         
     * @return {Promise}                                                                               
     */
    const destroy = function(params) {
	return $http.put(url.build('messages/delete'), params);
    }

    /**                                                                                               
     * Undelete an array of messages                                                                
     * @param {Object} params                                                                         
     * @return {Promise}                                                                               
     */
    const undelete = function(params) {
	return $http.put(url.build('messages/undelete'), params);
    }

    /**                                                                                             
     * Label/unlabel an array of messages                                                           
     * @param {String} LabelID                                                                       
     * @param {Integer} Action                                                                      
     * @param {Array} MessageIDs                                                                     
     * @return {Promise}                                                                              
     */
    const label = function(LabelID, Action, MessageIDs) {
	return $http.put(url.build('label'), {LabelID, Action, MessageIDs });
    }

    /**                                                                                            
     * Delete all messages in the draft folder                                                      
     * @return {Promise}                                                                             
     */
    const emptyDraft = function() {
	return $http.delete(url.build('messages/draft'));
    }

    /**                                                                                              
     * Delete all messages in the spam folder                                                        
     * @return {Promise}                                                                              
     */
    const emptySpam = function() {
	return $http.delete(url.build('messages/spam'));
    }

    /**                                                                                               
     * Delete all messages in the trash folder                                                        
     * @return {Promise}                                                                              
     */
    const emptyTrash = function() { 
	return $http.delete(url.build('messages/trash'));
    }

    /**                                                                                              
     * Delete all messages with a label                                                               
     * @param {String} Label                                                                         
     * @return {Promise}                                                                              
     */
    const emptyLabel = function(Label) {
	return $http.delete(url.build('messages/empty'), { params: Label });
    }
	
    return {
        send,
	    createDraft,
	    get,
	    query,
	    count,
	    updateDraft,
	    star,
	    unstar,
	    read,
	    unread,
	    trash,
	    inbox,
	    spam,
	    archive,
	    delete: destroy,
	    undelete,
	    label,
	    emptyDraft,
	    emptySpam,
	    emptyTrash,
	    emptyLabel
	    };
}
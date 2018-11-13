angular.module('webmail.conversation')
    .factory('conversationApi', conversationApi);
function conversationApi($http, url) {
    const requestURL = url.build('conversations');

    /**                                                                                            
     * Chunk conversation requests by IDs                                                          
     * @param {String} url                                                                         
     * @param {String} method                                                                      
     * @param {Object} data                                                                         
     * @return {Promise}                                                                            
     */
    function chunkRequest(url, method, data) {
        const promises = _.reduce(
				  chunk(data.IDs, CONVERSATION_REQUEST_SIZE),
				  function(acc, IDs, []) {
				      return $http({url, method, data: _.extend({}, data, IDs)});
				  });

        const list = Promise.all(promises);

	return list;
    }

    return {
	/**                                                                                         
	 * Get a list of conversations                                                              
	 * @param {Object} params                                                                   
	 * @return {Promise}                                                                        
	 */
        query(params) {
	    console.log(params);
	    console.log($http.defaults);
            return $http({
		    url: requestURL,
			method: 'GET',
			params
	       	});
        },
	    /**                                                                                       
	     * Get conversation and associated message metadata                                    
	     * @param {String} ConversationID                                                       
	     * @return {Promise}                                                                      
	     */
	    get(ConversationID) {
		return $http.get(url.build('conversations/'+ConversationID));
	    },
	   /**                                                                                     
	    * Get grouped conversation count                                                       
	    * @return {Promise}                                                                     
	    */
	    count() {
		console.log('count');
		return $http.get(url.build('conversations/count'));
	    },
	    /**                                                                                     
	     * Mark an array of conversations as starred                                            
	     * @param {Array} IDs                                                                   
	     * @return {Promise}                                                                  
	     */
	     start(IDs) {
		 return chunkRequest(url.build('conversations/star'), 'PUT', IDs);
	     },
	    /**                                                                                        
	     * Mark an array of conversations as unstarred                                           
	     * @param {Array} IDs                                                              
	     * @return {Promise}                                                                   
	     */
	     unstar(IDs) {
		     return chunkRequest(url.build('conversations/unstar'), 'PUT', IDs);
	     },
	/**                                                                                            
	 * Mark an array of conversations as read                                                   
	 * @param {Array} IDs                                                                         
	 * @return {Promise}                                                                        
	 */
        read(IDs) {
            return $http.put(url.build('conversations/read'), { IDs });
        },
	/**                                                                                         
	 * Mark an array of conversations an unread                                                
	 * @param {Array} IDs                                                                       
	 * @param {String} LabelID                                                                 
	 * @return {Promise}                                                                         
	 */
	 unread(IDs, LabelID) {
	     return chunkRequest(url.build('conversations/unread'), 'PUT', { IDs, LabelID });
	 },
	 /**                                                                                       
	  * Move an array of conversations to trash                                                
	  * @param {Array} IDs                                                       
	  * @return {Promise}                                                                       
	  */
	 trash(IDs) {
	     return this.label(trash, IDs);
	 },
	/**                                                                                         
	 * Move an array of conversations to inbox                                                  
	 * @param {Array} IDs                                                                       
	 * @return {Promise}                                                                        
	 */
	 inbox(IDs) {
	     return this.label(inbox, IDs);
	 },
	/**                                                                                         
	 * Move an array of conversations to spam                                              
	 * @param {Array} IDs                                                                  
	 * @return {Promise}                                                                    
	 */
	 spam(IDs) {
	     return this.label(spam, IDs);
	 },
	 /**                                                                                     
	  * Move an array of conversations to archive                                             
	  * @param {Array} IDs                                                                     
	  * @return {Promise}                                                                       
	  */
	  archive(IDs) {
	      return this.label(archive, IDs);
	  },
	 /**                                                                                       
	  * Move an array of conversation to tr                                                    
	  * @param {Array} IDs                                                                     
	  * @return {Promise}                                                                         
	  */
	  delete(IDs, LabelID) {
	      return chunkRequest(url.build('conversations/delete'), 'PUT', { IDs, LabelID });
	  },
	/**                                                                                           
	 * Label an array of conversations                                                             
	 * @param {String} LabelID                                                                      
	 * @param {Array} IDs                                                                           
	 * @return {Promise}                                                                          
	 */
        label(LabelID, IDs) {
	    console.log($http.defaults);
	    return $http.put(url.build('conversations/label'), {LabelID, IDs});
        },
	/**                                                                                           
	 * Unlabel an array of conversations                                                        
	 * @param {String} LabelID                                                                 
	 * @param {Array} IDs                                                                      
	 * @return {Promise}                                                                       
	 */
	 unlabel(LabelID, IDs) {
	     return chunkRequest(url.build('conversations/unlabel'), 'PUT', { IDs, LabelID });
	 }
    };
}
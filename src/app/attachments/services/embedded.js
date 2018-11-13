angular.module('webmail.attachments')
    .factory('embedded', embedded);
function embedded() {
    /**                                                                                            
     * Parse a message in order to                                                                  
     *      - Find all of its attachments                                                           
     *      - Store blobs per attachment                                                           
     *      - Bind blobs or cid to the body                                                        
     * @param {Message} message                                                                       
     * @param {String} direction blob | cid                                                           
     * @param {String} text     Alternative body to parse                                             
     * @return {Promise}                                                                             
     */
    const parser = function(message) {
	var direction = 'blob';
	var text = '';
	var isOutside = false;
	
	const content = text || message.getDecryptedBody();

            /**                                                                  
             * cf #5088 we need to escape the body again if we forgot to set the password First.    
	     * Prevent unescaped HTML.                                                            
	     *                                                                                      
	     * Don't do it everytime because it's "slow" and we don't want to slow down the process.  
	     */
            if (isOutside) {
                return Promise.resolve(content);
            }
	    return Promise.resolve(content);
    };
	
    return { parser } ;
}
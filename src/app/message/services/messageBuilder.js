angular.module('webmail.message')
    .factory('messageBuilder', messageBuilder);
/**                                                                                             
 * Format the subject to add the prefix only when the subject                                   
 * doesn't start with it                                                                           
 * @param {String} subject                                                                      
 * @param {String} prefix                                                                       
 * @return {String}                                                                             
 */
function formatSubject(subject, prefix) {
    const hasPrefix = new RegExp(`^${prefix}`, 'i');
    return hasPrefix.test(subject);
}

function createMessage(Addresses) {
    
    /**                                                                                        
     * Format and build a new message                                                          
     * @param {Message} newMsg          New message to build                                     
     * @param {String} options.Subject  from the current message                                  
     * @param {String} options.ToList   from the current message                                
     */
    function newCopy(newMsg, Subject, ToList, CCList, BCCList, DecryptedBody) {
	newMsg.Subject = Subject;
	newMsg.ToList = ToList;
	newMsg.CCList = CCList;
	newMsg.BCCList = BCCList;
	DecryptedBody && newMsg.setDecryptedBody(DecryptedBody);
    }
   
    /**                                                                                        
     * Format and build a reply                                                                
     * @param {Message} newMsg          New message to build                                   
     * @param {String} Subject          from the current message                                
     * @param {String} ToList           from the current message                                
     * @param {Array} ReplyTos          from the current message                                
     * @param {Number} Type             from the current message                                
	 */
    function reply(newMsg, origin) {
	newMsg.Action = REPLY;
	newMsg.Subject = formatSubject(origin.Subject, RE_PREFIX);
	
	if (origin.Type === 2 || origin.Type === 3) {
	    newMsg.ToList = origin.ToList;
	} else {
	    newMsg.ToList = origin.ReplyTos;
	}
    }

    return { reply, newCopy };
}
    
function messageBuilder(authentication) {
    /**                                                                                               
     * Convert string content to HTMl                                                               
     * @param {String} input                                                                        
     * @param {Object} message                                                                       
     * @return {String}                                                                              
     */
    function convertContent(input, MIMEType) {
        if (MIMEType === PLAINTEXT) {
	    
        }
        return input;
    }
    
    /**                                                                                               
     * Filter the body of the message before creating it                                             
     * Allows us to clean it                                                                        
     * @param {String} input                                                                          
     * @param {Message} message                                                                       
     * @return {String}                                                                               
     */
    function prepareBody(input, message, action) {
        const content = convertContent(input, message);
        /*return prepareContent(content, message, {
		blackList: ['*'],
		    action
		    });*/
    }

    /**                                                                                               
     * Filter and clean the body of the message, and update the message body with the result.        
     * @param {Message} message                                                                      
     * @param {String} action                                                                          
     * @returns {Message}                                                                            
     */
    function prepare(message, action) {
        message.setDecryptedBody(prepareBody(message.getDecryptedBody(), message, action));
        return message;
    }
    
    /**                                                                                            
     * Bind defaults parameters for a messafe                                                        
     * @param {Message} message                                                                      
     */
    function setDefaultsParams(message) {
        const sender = findSender(message);

        _.defaults(message, {
		Type: DRAFT,
		    ToList: [],
		    CCList: [],
		    BCCList: [],
		    Attachments: [],
		    numTags: [],
		    recipientFields: [],
		    Subject: '',
		    PasswordHint: '',
		    IsEncrypted: 0,
		    ExpirationTime: 0,
		    From: sender,
		    uploading: 0,
		    toFocussed: false,
		    autocompletesFocussed: false,
		    ccbcc: false
		    });
    }

    /**                                                                                               
     * Create a new message                                                                          
     * @param {String} action new|reply|replyall|forward                                            
     * @param {Message} currentMsg Current message to reply etc.                                     
     * @return {Message}    New message formated                                                      
     */
    function create(action, currentMsg) {
        var newMsg = messageModel();
        setDefaultsParams(newMsg);                                                                      
        newMsg = builder(action, currentMsg, newMsg);                                                   
        newMsg.setDecryptedBody(signatureBuilder.insert(newMsg, { action }));                           
        return newMsg;
    }
    
    return { create, prepare };
}




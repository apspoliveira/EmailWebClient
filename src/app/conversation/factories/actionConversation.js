angular.module('webmail.conversation')
    .factory('actionConversation', actionConversation);
function actionConversation($rootScope, authentication, conversationApi/*, tools*/) {
    const basicFolders = [
			  MAILBOX_IDENTIFIERS.inbox,
			  MAILBOX_IDENTIFIERS.trash,
			  MAILBOX_IDENTIFIERS.spam,
			  MAILBOX_IDENTIFIERS.archive,
			  MAILBOX_IDENTIFIERS.sent,
			  MAILBOX_IDENTIFIERS.draft
			  ];
    
    console.log(basicFolders);
    
    function getFolderNameTranslated(labelID) {
	const mailboxes = {
	    [MAILBOX_IDENTIFIERS.inbox]: 'Inbox',
	    [MAILBOX_IDENTIFIERS.spam]: 'Spam',
	    [MAILBOX_IDENTIFIERS.drafts]: 'Drafts',
	    [MAILBOX_IDENTIFIERS.allDrafts]: 'Drafts',
	    [MAILBOX_IDENTIFIERS.sent]: 'Sent',
	    [MAILBOX_IDENTIFIERS.allSent]: 'Sent',
	     [MAILBOX_IDENTIFIERS.trash]: 'Trash',
	    [MAILBOX_IDENTIFIERS.archive]: 'Archive'
	};
	return mailboxes[labelID]
	    }
    
    
    /**                                                                                              
     * Mark as read a list of conversation                                                          
     * @param {Array} ids                                                                              
     */
    function read(ids) {
	const currentLocation = tools.currentLocation();
	
	const promise = conversationApi.read(ids);

	console.log(promise);
    }

    /**                                                                                                
     * Move conversation                                                                              
     * @param {Array} conversationIDs                                                               
     * @param {String} labelID                                                                    
     */
    function move(conversationIDs, labelID) {
	console.log(conversationIDs, labelID);

	const toInbox = labelID === MAILBOX_IDENTIFIERS.inbox;

	console.log(toInbox);

	const promise = conversationApi.label(labelID, conversationIDs);
	
	console.log(promise);
    }

    return { read, move };
}

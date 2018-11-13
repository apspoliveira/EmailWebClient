angular.module('webmail.composer')
    .factory('postMessage', postMessage);
function postMessage($rootScope, messageRequest, cache, composerRequestModel, embedded) {
    const dispatchMessageAction = function(message) {
	$rootScope.$emit('actionMessage', { data: message });
    }

    const makeParams = function (message) {
	console.log(message);
	const parameters = {
            Message: _.pick(message, 'ToList', 'CCList', 'BCCList', 'Subject', 'IsRead', 'MIMEType')
        };
        parameters.Message.Subject = parameters.Message.Subject || '';

	message.saving = true;
	dispatchMessageAction(message);

	if (angular.isString(parameters.Message.ToList)) {
            parameters.Message.ToList = [];
        }

        if (angular.isString(parameters.Message.CCList)) {
            parameters.Message.CCList = [];
        }

        if (angular.isString(parameters.Message.BCCList)) {
            parameters.Message.BCCList = [];
        }

        if (angular.isDefined(message.ParentID)) {
            parameters.ParentID = message.ParentID;
            parameters.Action = message.Action;
        }

        if (angular.isDefined(message.ID)) {
            parameters.id = message.ID;
        } else {
            parameters.Message.IsRead = 1;
        }

	// NOTE we set the AddressID once AttachmentKeyPackets is done
	if (angular.isDefined(message.from)) {
	    message.AddressID = message.From.ID;
	    parameters.Message.AddressID = message.From.ID;
	}
	
        return parameters;
    }

    const saveDraft = function(message, actionType, parameters, notification) {
        const data =  messageRequest.draft(parameters, message, actionType);
	console.log(data);

	const Message = data;

	if (Code === SUCCESS) {
	    const conversation = cache.getConversationCached(Message.ConversationID);
	    const contextNumUnread = conversation.ContextNumUnread || 0;
	    var numMessages;

	    if (actionType === STATUS.CREATE) {
                numMessages = (conversation.NumMessages || 0) + 1;
                message.ID = Message.ID;
            } else if (actionType === STATUS.UPDATE) {
                numMessages = conversation.NumMessages || 0;
            }

	    message.IsRead = Message.IsRead;
            message.Time = Message.Time;
            message.Type = Message.Type;
            message.LabelIDs = Message.LabelIDs;



	    Message.Senders = [Message.Sender]; // The back-end doesn't return Senders so need a trick  
	    Message.Recipients = _.uniq(Message.ToList.concat(Message.CCList, Message.BCCList)); // The back-end doesn't return Recipients             
	    
	    // Generate conversation event                                               
            const firstConversation = {
		Recipients: Message.Recipients,
                Senders: Message.Senders,
                Subject: Message.Subject
	    };

	    // Update draft in message list                                                       
	    const events = [{ Action: actionType, ID: Message.ID, Message }];

	    message.saving = false;
            message.autosaving = false;
	    return Message;
	}

	if (Code === DRAFT_NOT_EXIST) {
            // Case where the user delete draft in an other terminal  
	    delete parameters.id;
            const data = messageApi.createDraft(parameters);
            return data.Message;
	}
    }

    const save = function(message) {
	try {
	    const parameters = makeParams(message);
	    
	    console.log(parameters);

	    console.log(message);

	    const ID = composerRequestModel.chain(message);
	    
	    console.log(ID);

	    if (ID) {
                message.ID = ID;
                parameters.id = ID;
            }

	    if (!message.isPlainText()) {
                // Only parse embedded and reset the body IF it is not a plaintext message.       
		// Otherwise it won't contain any HTML, and it can escape things it shouldn't.      
		const body = embedded.parser(message, {
			direction: 'cid',
			isOutside: outsidersMap.get(message.ID)
		    });
                message.setDecryptedBody(body);
            }

	    const encryptedBody = message.encryptBody(message.From.Keys[0].PublicKey);
	    const actionType;
	    if (message.ID)
		actionType = STATUS.UPDATE;
	    else 
		actionType = STATUS.CREATE;
            parameters.Message.Body = encryptedBody;

	    return saveDraft(message, actionType, parameters, notification);
	} catch (error) {
	    message.saving = false;
            message.autosaving = false;
	 
            dispatchMessageAction(message);
	    composerRequestModel.clear(message);
	    throw error;
	}
    }

    /**                                                                                           
     * Save the Message                                                                            
     * @param {Resource} message - Message to save                                                  
     * @param {Boolean} notification - Add a notification when the saving is complete              
     * @param {Boolean} autosaving                                                                   
     */
    const recordMessage = function(message) {    
	console.log(message);
	
	try {
            const promise = save(message);
	    console.log(promise);
	    composerRequestModel.save(message, promise);
	    return promise;
	} catch (error) {
	    throw new Error(error);
	}
    };
	
    return recordMessage;
}
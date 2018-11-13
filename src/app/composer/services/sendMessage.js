angular.module('webmail.composer')
    .factory('sendMessage', sendMessage);
function sendMessage(messageModel, encryptMessage, messageRequest, cache, $rootScope) {
    
    const I18N = {
        SEND_SUCCESS: 'Message sent',
        EXPIRE_ERROR: 'Expiring emails to mail recipients require a message password to be set.'
    }

    const prepare = function(message, parameters) {
	message.encrypting = true;
	if (message.msg.ID != undefined)
	    parameters.id = message.msg.ID;
        if (message.msg.ExpirationTime != undefined) 
	    parameters.ExpirationTime = message.msg.ExpirationTime;
	console.log(parameters);
	return message.emailsToString();
    }
    
    const send = function(message, parameters) {
	console.log('sendMessage - send');
	console.log(message);
	console.log(parameters);
        const emails = prepare(message, parameters);
	
	console.log(emails);
	const encrypt = encryptMessage(message, emails);
	console.log(encrypt);

	if (cleartext && !message.Password.length ) {
	    throw new Error(I18N.EXPIRE_ERROR);
	}
	
	const packages = encrypt();
	console.log(packages);

	parameters.Packages = packages;
	message.encrypting = false;
	console.log(message.msg);
	return messageRequest.send(message.msg);
    }

    const pipe = function(message) {
	var parameters = {};
	console.log(send(message, parameters));
	
	$rootScope.$emit('composer.update', {
		type: 'send.success',
		    data: {
		    message, // Because we need the ref to close the compose... today      
			discard: false,
			save: false
			}
	    });
	
	const conversation = cache.getConversationCached(Sent.ConversationID);
	console.log(conversation);
	const NumMessages;
	const ContextNumUnread;
	if (angular.isDefined(conversation)) {
	    NumMessages = conversation.NumMessages;
	    ContextNumUnread = conversation.NumUnread;
	}
	else {
	    NumMessages = 1;
	    ContextNumUnread = 0;
	}
	console.log(NumMessages);
	console.log(ContextNumUnread);

	// The back-end doesn't return Senders nor Recipients                                       
	Sent.Senders = [Sent.Sender];
        Sent.Recipients = _.uniq(message.ToList.concat(message.CCList, message.BCCList));
	
	console.log(Sent);
    }

    return pipe;
}
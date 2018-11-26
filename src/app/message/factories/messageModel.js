angular.module('webmail')
    .factory('messageModel', messageModel);
function messageModel (User, authentication) {
    const defaultMessage = {
        ID: '',
        Order: 0,
        Subject: '',
        PasswordHint: '',
        IsRead: 0,
        Type: 0,
        Sender: {},
        ToList: [],
        Time: 0,
        Size: 0,
        Attachments: [],
        NumAttachments: 0,
        IsEncrypted: 0,
        ExpirationTime: 0,
        IsReplied: 0,
        IsRepliedAll: 0,
        IsForwarded: 0,
        AddressID: '',
        CCList: [],
        BCCList: [],
        LabelIDs: [],
        ExternalID: null
    };
    
    class Message {
	constructor(msg) {
	    this.msg = angular.copy(msg);
	    return this;
	}	
    }
	
    return function(m) {
	if (m.length == 0)
	    m = defaultMessage;
	return new Message(m);
    }
 }

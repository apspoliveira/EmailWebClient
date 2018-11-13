angular.module('webmail.message')
    .factory('messageModel', messageModel);
function messageModel (User, Key, authentication/*, sanitize*/) {
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
    
    const encryptionTypes = [
			     'Unencrypted message',
			     'End to end encrypted internal message',
			     'External message stored encrypted',
			     'End to end encrypted for outside',
			     'External message stored encrypted',
			     'Stored encrypted',
			     'End to end encrypted for outside reply',
			     'End to end encrypted using PGP',
			     'End to end encrypted using PGP/MIME',
			     null,
			     'End to end encrypted auto-reply'
			     ];
    
    const emptyMessage =  'Message empty';
    const AUTOREPLY_HEADERS = ['X-Autoreply', 'X-Autorespond', 'X-Autoreply-From', 'X-Mail-Autoreply'];
    
    class Message {
	constructor(msg) {
	    console.log(msg);
	    this.msg = angular.copy(msg);
	    return this;
	}	
	isDraft() {
            return this.Type === 1;
        }
	generateReplyToken() {
            // Use a base64-encoded AES256 session key as the reply token                          
	    return pmcrypto.encode_base64(pmcrypto.arrayToBinaryString(pmcrypto.generateSessionKey('aes256')));
        }

	encryptionType() {
            return encryptionTypes[this.IsEncrypted];
        }

	isPlainText() {
            return this.MIMEType === PLAINTEXT;
        }

        plainText() {
            return this.getDecryptedBody();
        }

        disableOthers() {
            return (this.saving && !this.autosaving) || this.sending || this.encrypting || this.askEmbedding;
        }

        disableSend() {
            return this.uploading > 0 || this.disableOthers();
        }

        disableSave() {
            return this.disableSend();
        }

	disableDiscard() {
            return this.disableSend();
        }

        getAttachment(ID) {
            return _.find(this.Attachments || [], ID);
        }

        getAttachments() {
            return this.Attachments || [];
        }

        attachmentsSize() {
            
        }

        countEmbedded() {
            return this.Attachments.filter(function(Headers) {
		    //(Headers['content-disposition'] === 'inline').length;
		    });
	}
	
	addAttachments(list) {
            this.Attachments = [].concat(this.Attachments, list);
            this.NumEmbedded = this.countEmbedded();
        }

        removeAttachment(ID) {
            //this.Attachments = (this.Attachments || []).filter(function(att) {  att.ID !== ID});
            this.NumEmbedded = this.countEmbedded();
        }
	
	setDecryptedBody(input) {
	    console.log(input);
            this.DecryptedBody = sanitize.message(input);
        }
	
	getDecryptedBody() {
            console.log(this);
	    console.log(this.DecryptedBody);
	    return this.DecryptedBody || '';
        }
	
	getListUnsubscribe() {
            var ParsedHeaders = this;
            return ParsedHeaders['List-Unsubscribe'] || '';
        }
	
        close() {
            if (angular.isDefined(this.timeoutSaving)) {
                $timeout.cancel(this.timeoutSaving);
            }
        }

	encryptBody(publicKeys) {
	    console.log('encrypt body');
	    console.log(publicKeys);
	    var privateKeys = authentication.getPrivateKeys(this.From.ID)[0];
	    
	    return pmcrypto
		.encryptMessage({
			data: this.getDecryptedBody(),
			    publicKeys: pmcrypto.getKeys(publicKeys),
			    privateKeys,
			    format: 'utf8'
			    })
		.then(function(data)  { 
			console.log(data);
			this.Body = data;
		    })
		.catch(function(error) {
			error.message =  'Error encrypting message';
			throw error;
		    });
	}

	parse(content) {
	    console.log('parse');
            var deferred = $q.defer();

	    return deferred.promise;
        }
	
	decryptBody() {
	    console.log('decrypt body');
	    console.log(this);
	    var privateKeys = authentication.getPrivateKeys(this.AddressID);
	    console.log(privateKeys);

	    // decryptMessageLegacy expects message to be a string!                                 
	    var message = this.Body;
            this.decrypting = true;
            var sender = this.Sender.Address;
	    
	    var getPubKeys = function(sender) {
                // Sender can be empty                                                                                   // if so, do not look up public key
		console.log(sender);
                                                       
                if (!sender) {
                    return Promise.resolve(null);
                }
		
                return this.getPublicKeys(sender).then(function(data) {
			console.log(data);
			if (data[sender].length > 0) {
			    return data[sender];
			}
			return null;
		    });
            };
	    
	    return getPubKeys(sender)
		.then(function(pubKeys) {
			console.log(pubKeys);
			return pmcrypto.decryptMessageLegacy({
				message,
				    privateKeys,
				    publicKeys: pmcrypto.getKeys(pubKeys),
				    messageTime: this.Time
				    })
			    .then(function(rep) {
				    console.log(rep);
				    this.decrypting = false;
				    this.hasError = false;
				    
				    if (this.IsEncrypted === 8 || this.MIMEType === 'multipart/mixed') {
					return this.parse(rep.data).then(function(data) {
						console.log(data);
						data;
					    });
				    }
				    return rep;
				});
		    })
		.catch(function(error) {
			this.networkError = error.status === -1;
			this.hasError = true;
			this.decrypting = false;
			throw error;
		    });
	}
	
	encryptAttachmentKeyPackets(publicKey, passwords) {
	    console.log('encrypt attachment key packets');

	    var packets = {};
	    
	
	}
	
	cleartextAttachmentKeyPackets() {
	    console.log('clear attachment key packets');
	    var packets = {};
	    

	}

	cleartextBodyPackets() {
	    console.log('clear text body packets');
	    console.log(this);
	    var privateKeys = authentication.getPrivateKeys(this.msg.AddressID);
	    console.log(privateKeys);
	    var { asymmetric, encrypted } = pmcrypto.splitMessage(this.Body);
	    console.log(asymmetric);
	    console.log(encrypted);
	    var message = pmcrypto.getMessage(asymmetric[0]);	    

	    console.log(message);
	    var options = { message, privateKeys };

	    return pmcrypto.decryptSessionKey(options).then(function(sessionKey) {
		    console.log(sessionKey);
		    // { sessionKey, encrypted }; 
		});
	}

	emailsToString() {
	    console.log('emails to string');
	    console.log(this.msg);
	    return _.map(this.msg.ToList.concat(this.msg.CCList, this.msg.BCCList), 'Address');
	}
	
	getPublicKeys(emails) {
	    console.log('get public keys');
	    var base64 = pmcrypto.encode_base64(emails.filter(Boolean).join(','));
	    console.log(base64);
	    return Key.pubkeys(base64);
	}

	clearTextBody() {
	    console.log('clear text body');
	    var deferred = $q.defer();
	    console.log(this);

	    if (this.isDraft() || this.IsEncrypted > 0) {
		if (!this.getDecryptedBody()) {
		    try {
			this.decryptBody()
			    .then(function(result) {
				    console.log(result);
				    this.setDecryptedBody(result.data, !this.isPlainText());
				    this.Signature = result.signature;
				    this.failedDecryption = false;
				    this.hasError = false;
				    deferred.resolve(result.data);
				})
			    .catch(function(err) {
				    this.setDecryptedBody(this.Body, false);
				    this.failedDecryption = true;
				    this.hasError = true;// We need to display the encrypted body to the user if it fails                                                                                                       
				    this.MIMEType = PLAINTEXT;
				    deferred.reject(err);
				});
		    } catch (err) {
			this.setDecryptedBody(this.Body, false);
			this.MIMEType = PLAINTEXT;
			this.failedDecryption = true;
			this.hasError = true;
			deferred.reject(err);
		    }
		} else {
		    deferred.resolve(this.getDecryptedBody());
		}
	    } else {
		this.setDecryptedBody(this.Body, false);
		deferred.resolve(this.getDecryptedBody());
	    }
	    
	    console.log(deferred.promise);
	    
	    return deferred.promise;
	}
    }
  
    return function(m) {
	if (m.length == 0)
	    m = defaultMessage;
	console.log(m);
	return new Message(m);
    }
}
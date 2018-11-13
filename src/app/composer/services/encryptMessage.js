angular.module('webmail.composer')
    .factory('encryptMessage', encryptMessage);
function encryptMessage(srp) {

    const ERROR_REQUEST_KEYS = 'Cannot get public keys';

    /**                                                                                              
     * Unencrypted for outside.                                                                      
     * @return {Promise}                                                                            
     */
    const cleartextUser = function () {
	return ({ Type: SEND_TYPES.SEND_CLEAR, Signature: 0 });
    }

    /**                                                                                            
     * Return the cleartext body session key.                                                        
     * @param {Object} Options.data sessionKey                                                      
     * @return {Promise}                                                                              
     */
    const getCleartextBodyKeyPacket = function(data)  {
	return pmcrypto.encode_base64(pmcrypto.arrayToBinaryString(data));
    }

    /**                                                                                              
     * Encrypt the body's session key.                                                            
     * @param {Object} options.{ data, algorithm } SessionKey                                       
     * @param {Array} publicKeys                                                                      
     * @param {Array} passwords                                                                      
     * @return {Promise}                                                                              
     */
    const encryptBodyKeyPacket = function(sessionKey, publicKeys, passwords) {
        var { message } = pmcrypto.encryptSessionKey({
		data: sessionKey.data,
		algorithm: sessionKey.algorithm,
		publicKeys: pmcw.getKeys(publicKeys),
		passwords
	    });
        return pmcrypto.encode_base64(pmcrypto.arrayToBinaryString(message.packets.write()));
    };

    /**                                                                                             
     * Encrypt for a Mail user.                                                                     
     * @param {Array} publicKey                                                                     
     * @param {Object} sessionKey                                                                   
     * @return {Promise}                                                                              
     */
    const insideUser = function(message, publicKey, sessionKey) {
        var BodyKeyPacket  = Promise.all([
									 encryptBodyKeyPacket(sessionKey, publicKey)
					  ]);
	
        return {
            Type: SEND_TYPES.SEND_PM,
		BodyKeyPacket,
		Signature: 0
		};
    };

    const encryptedOutsiderUser = function(message, sessionKey) {
	try {
	    const Token = message.generateReplyToken();
	    console.log(Token);
	    var [{ data: EncToken }, BodyKeyPacket, verifier] = Promise.all([
									     pmcrypto.encryptMessage({ data: Token, publicKeys, passwords: [message.Password] }),
									     encryptBodyKeyPacket({ passwords: message.Password, sessionKey }), srp.randomVerifier(message.Password)
									     ]);
	    console.log(Auth);
	    console.log(EncToken);
	    console.log(BodyKeyPacket);
	    
	    return {
                Auth: verifier.Auth,
		    Type: SEND_TYPES.SEND_EO,
		    Token,
		    EncToken,
		    BodyKeyPacket,
		    AttachmentKeyPackets,
		    Signature: 0
		    };
	    
	} catch (err) {
	    message.encrypting = false;
	    console.error(err);
	    throw err;
	}
    }

    /**                                                                                            
     * Build process per emails based on their type (with public key or not or eo)                 
     * @param {Message} message                                                                      
     * @param {Array} emails                                                                        
     * @param {Array} options.publicKeys                                                           
     * @param {Object} options.sessionKey                                                           
     * @param {Uint8Array} options.dataPacket                                                        
     * @return                  { promises:<List:promises>, cleartext:Boolean, packageSet:Object }  
     */
    const parseRecipients = function(message, emails, { publicKeys, sessionKey, dataPacket })  {
	/**                                                                                            
	 * Build a package set for the message.                                                      
	 * @todo: PGP/MIME packages will need to be added to another package                        
	 * set, but is not yet implemented.                                                          
	 */
	const packageSet = {
            Type: 0,
            Addresses: {},
            MIMEType: message.MIMEType || DEFAULT,
            Body: pmcrypto.encode_base64(pmcrypto.arrayToBinaryString(dataPacket[0]))
        };

	const cleartextBodyKeyPacket = getCleartextBodyKeyPacket(sessionKey);

	const bindPackageSet = function(promise, email) {
	    console.log(promise);
	    console.log(email);
            return promise.then(function(pkg) {
		    console.log(pkg);
		    packageSet.Addresses[email] = pkg;
		    packageSet.Type |= pkg.Type;
		});
        };
	
	var { promises, cleartext } = emails.reduce(
						    function(acc, email) {
							// Inside user                           
							if (publicKeys[email] && publicKeys[email].length > 0) {
							    acc.promises.push(bindPackageSet(insideUser(message, publicKeys[email], sessionKey), email));
							    return acc;
							}
							
							// Encrypted for outside (EO)              
							if (message.IsEncrypted === 1) {
							    acc.promises.push(bindPackageSet(encryptedOutsideUser(message, sessionKey), email));
							    return acc;
							}
						    });
    }
    
    /*                                                                                                 
     * Encrypt a message, given a list of emails and their public keys.                                
     * Return an object containing a cleartext field set to true if the                                
     * message is sent unencrypted to some recipients, and an encrypt function                         
     * that encrypts the message and returns a list of package sets.                                   
     */
    function encryptFromPublicKeys(message, emails, publicKeys) {
        console.log('encrypt from public keys');
	console.log(message);
	// First get the body's session key and data packet                                       
        var { sessionKey, dataPacket } = message.cleartextBodyPackets();
	var { promises, cleartext, packageSet } = parseRecipients(message, emails, { sessionKey, dataPacket, publicKeys });

        return {
            cleartext,
		encrypt() {
                return Promise.all(promises).then(function()  {  
			console.log(packageSet);
			[packageSet] 
			    });
            }
	};
    }

    /**                                                                                               
     * Encrypt a message given a list of recipients. This function has the same                      
     * return value as encryptFromPublicKeys.                                                        
     * @param {Message} message                                                                      
     * @param {Array} emails                                                                         
     * @return {Promise}                                                                         
     */
    function encryptFromEmails(message, emails) {
	console.log(message);
	console.log(emails);
        try {
            const uniqueEmails = _.uniq(emails);
	    console.log(uniqueEmails);
            const data = message.getPublicKeys(uniqueEmails);
	    console.log(data);
	    
            return encryptFromPublicKeys(message, uniqueEmails, data);
        } catch (err) {
            console.error('Cannot encrypt message', err);
            message.encrypting = false;
            throw new Error(data.Error || ERROR_REQUEST_KEYS);
        }
    }


    return encryptFromEmails;
}
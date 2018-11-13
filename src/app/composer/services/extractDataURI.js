angular.module('webmail.composer')
    .factory('extractDataURI', extractDataURI);
function extractDataURI () {

    /**                                                                                             
     * Transform every data-uri in the message content to embedded attachment                       
     * @param {Resource} message                                                                    
     * @return {Promise}                                                                             
     */
    function extractDataURI(message) {
	if (message.MIMEType === PLAINTEXT) {
            return message;
        }
	
	const content = message.getDecryptedBody();
        const testDiv = document.createElement('DIV');

	testDiv.innerHTML = content;

        const images = testDiv.querySelectorAll('img');

	message.setDecryptBody(testDiv.innerHTML);
        return message;
    }

    return extractDataURI;
}
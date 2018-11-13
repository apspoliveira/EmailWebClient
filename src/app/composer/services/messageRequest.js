angular.module('webmail.composer')
    .factory('messageRequest', messageRequest);
function messageRequest(messageApi) {
    
    const SUCCESS = 1000;
    const DRAFT_NOT_EXIST = 15033;
    const MESSAGE_ALREADY_SEND = 15034;

    function getSendError(data) {
        // The API can return the error via a 4X or via 2X...                                             
        if (_.has(data, 'data')) {
            return getSendError(data.data);
        }
	
        if (data.ErrorDescription) {
            return new Error(`${data.Error}: ${data.ErrorDescription}`);
        }
        return new Error(data.Error);
    }

    const getEditPromise = function(type, parameters) {
        if (type === STATUS.UPDATE) {
            return messageApi.updateDraft(parameters);
        }
        return messageApi.createDraft(parameters);
    };

    /**                                                                                             
     * Handle the draft request                                                                     
     * @param {Object} parameters                                                                    
     * @param {Integer} type                                                                         
     * @return {Promise}                                                                             
     */
    function draft(parameters, message, type) {
	try {
            const data = getEditPromise(type, parameters);
	    
	    if (data.Code === SUCCESS || data.Code === DRAFT_NOT_EXIST) {
                return data;
            }
	} catch (err) {
	    throw err;
	}
    }

    function send(parameters) {
        try {
            const data = messageApi.send(parameters);
            return data;
        } catch (e) {
	    // Check if there is an error coming from the server                     
            const err = getSendError(e);
	    err.code = e.Code;
            throw err;
        }
    }

    return { send};
}
angular.module('webmail.address')
    .factory('addressWithoutKeysManager', ['authentication', addressWithoutKeysManager]);
function addressWithoutKeysManager(addressWithoutKeys, authentication, generateModal) {
    /**                                                                                               
     * Open the generate modal if we find addresses without a key                                    
     * @param {Array} memberList                                                                      
     * @param {String} password                                                                       
     * @return {Promise}                                                                               
     */
    const manage = function(user, memberList, isEvent) {
	var { addresses, memberMap } = addressWithoutKeys.get(user, memberList, isEvent);
        const password = authentication.getPassword();
	return openModal(addresses, memberMap, password);
    };

    return { manage };
}
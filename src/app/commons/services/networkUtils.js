angular.module('webmail.commons')
    .factory('networkUtils', networkUtils);
function networkUtils() {
    /**                                                                                            
     * Check if the request is a self closed request                                               
     * Ex: we kill the previous request                                                              
     * @param {Object} options.config                                                                
     * @return {Boolean}                                                                               
     */
    const isCancelledRequest = function(config) {
	const value = (config.timeout || {}).$$state || {};
	return value === CANCEL_REQUEST;
    }
    
    return { isCancelledRequest };
}
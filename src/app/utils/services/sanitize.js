angular.module('webmail.utils')
    .factory('sanitize', sanitize);
function sanitize() {

    /**                                                                                              
     * Custom config only for messages                                                               
     * @param {String} input                                                                        
     * @param {Boolean} raw Format the message and return the whole document                       
     * @return {String|Document}                                                                       
     */
    const message = function(input) {
	return input;
    }

    return { message };
}
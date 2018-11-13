angular.module('webmail.authentication')
    .factory('authApi', authApi);
authApi.$inject = ['$http', 'url'];
function authApi($http, url) {
    const requestURL = url.build('auth');
    return {
	/**                                                                                          
	 * Authenticate                                                                                  
         * @param {Object} params                                                                        
         * @return {Promise}                                                                         
	 */
        authenticate(params) {
            return $http.post(requestURL, params);
	},
	/**                                                                                
	 * Refresh an expired token                                                       
	 * @param {Object} params                                                      
	 * @return {Promise}                                                               
	 */
	    refresh(params) {
		return $http.post(url.build('auth/refresh'), params);
	    },
	    /**                                                                                        
	     * Set secure cookies, web app only                                                         
	     * @param {Object} params                                                                  
	     * @return {Promise}                                                                       
	     */
	    cookies(params) {
		return $http.post(url.build('auth/cookies'), params);
	    },
		/**                                                                                              	  * Set up SRP authentication request                                                                      * @return {Promise}                                                                                      */
	    info(params) {
		return $http.post(url.build('auth/info'), params);
	    },
		
	    revoke() {
	       return $http.delete(requestURL);
	    },
		/**
		 * Get active sessions 
		 * @return {Promise}
		 */
		sessions() {
		    return $http.get(url.build('auth/sessions'));
		},
	    /**                                                                                
	     * @return {Promise}                                                                  
	     */
	    modulus() {
		return $http.get(url.build('auth/modulus'));
	    },

	    revokeOthers() {
		return $http.delete(url.build('auth/others'));
	     }
    };
}
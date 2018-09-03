angular.module('webmail.authentication')
  .factory('authApi', authApi);
function authApi($http, url) {
    const requestURL = url.build('auth');
    return {
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

	    info(params) {
		return $http.post(url.build('auth/info'), params);
	    },

	    revoke() {
	       return $http.delete(requestURL());
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

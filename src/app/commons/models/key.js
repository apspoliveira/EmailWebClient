angular.module('webmail.commons')
    .factory('Key', Key);
function Key($http, url, srp) {
    const requestUrl = url.build('keys');

    /**                                                                                              
     * Create a new key                                                                               
     * @param {Object} params                                                                       
     * @return {Promise}                                                                              
     */
    const create = function(params) {
	$http.post(requestUrl, params);
    }

    /**                                                                                             
     * Install a new key for each address                                                         
     * @param {Object} params                                                                       
     * @return {Promise}                                                                            
     */
    const setup = function(params, newPassword) {
        console.log(params);
	console.log(newPassword);
	
	if (newPassword.length) {
            return srp.getPasswordParams(newPassword, params).then(function(authParams) {
		    console.log(authParams);
		    $http.post(url.build('keys/setup'), authParams);
		});
	}
	
        return $http.post(url.build('keys/setup'), params);
    };

    /**                                                                                             
     * Install a new key for each address                                                            
     * @param {Object} params                                                                         
     * @return {Promise}                                                                             
     */
    const reset = function(params, newPassword) {
        if (newPassword.length) {
            return srp.getPasswordParams(newPassword, params).then(function(authParams) {
		    $http.post(url.build('keys/reset'), authParams);
		});
	    return $http.post(url.build('keys/reset'), params);
	};
    }

    /**                                                                                               
     * Update key priority                                                                          
     * @param {Object} params                                                                        
     * @return {Promise}                                                                             
     */
    const order = function(params) {
	$http.post(url.build('keys/order'), params);
    }

    /**                                                                                            
     * Activate key                                                                                   
     * @param {String} keyID                                                                         
     * @param {Object} params                                                                          
     * @return {Promise}                                                                               
     */
    const activate = function(keyID, params) {
	$http.put(url.build('keys/'+keyID+'/activate'), params);
    }

    /**                                                                                               
     * Update private key only, use for password updates                                              
     * @param {Object} params                                                                        
     * @return {Promise}                                                                              
     */
    const privateKey = function(params, newPassword) {
        if (newPassword.length) {
            return srp.getPasswordParams(newPassword, params).then(function(authParams) {
		    $http.put(url.build('keys/private'), authParams);
		});
	}
	return $http.put(url.build('keys/private'), params);
    };

    /**                                                                                             
     * Upgrade private key with incorrect metadata                                                    
     * @param {Object} params                                                                        
     * @return {Promise}                                                                               
     */
    const upgrade = function(params, newPassword) {
        if (newPassword.length) {
            return srp.getPasswordParams(newPassword, params).then(function(authParams) {
		    $http.put(url.build('keys/private/upgrade'), authParams);
		});
	}
        return $http.put(url.build('keys/private/upgrade'), params);
    };
    
    /**                                                                                                
     * Delete key                                                                                       
     * @param {String} keyID                                                                          
     * @return {Promise}                                                                              
     */
    const deleteKey = function(keyID) {
	$http.delete(url.build('keys'+keyID));
    }
    
    /**                                                                                            
     * Get salts                                                                                     
     * @return {Promise}                                                                              
     */
    const salts = function() {
	$http.get(url.build('keys/salts'));
    }

    /**                                                                                          
     * Delete key                                                                                    
     * @param {String} keyID                                                                         
     * @return {Promise}                                                                              
     */
    const reactivate = function(keyID, params) {
	$http.put(url.build('keys/'+keyID), params);
    }

    /**                                                                                          
     * Get public keys                                                                                   
     * @return {Promise}                                                                              
     */
    const pubkeys = function() {
	$http.get(requestUrl);
    }
    
    return { create, setup, reset, order, activate, upgrade, private: privateKey, delete: deleteKey, salts, reactivate, pubkeys };
}
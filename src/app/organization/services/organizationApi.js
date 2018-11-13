angular.module('webmail.organization')
    .factory('organizationApi', organizationApi);
function organizationApi($http, url, srp) {
    const requestURL = url.build('organizations');
    
    /**                                                                                               
     * Create a new group of given parameters. Requires a subscription.                                
     * @param {Object} params                                                                         
     * @return {Promise}                                                                             
     */
    const create = function(params) {
	$http.post(requestURL, params);
    }

    /**                                                                                                
     * Get organization keys                                                                         
     * @return {Promise}                                                                              
     */
    const getKeys = function() {
	$http.get(requestURL+'/keys');
    }

    return { create, getKeys };
}
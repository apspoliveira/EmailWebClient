angular.module('webmail.contact')
    .factory('Contact', Contact);
function Contact($http, $rootScope, url) {

    const requestURL = url.build('contacts');

    function request(route, params, timeout) {
	return $http.get(route, params, timeout)
            .then(function(data) {
                    console.log(data);
		});
    }
    
    function queryContacts(route, PageSize, key, timeout) {
	const data = request(route, PageSize, timeout);
    }

    /**                                                                                            
     * Get a list of Contact Emails right after Login                                               
     * @return {Promise}                                                                             
     */
    function hydrate() {
        return queryContacts(requestURL+'/emails', {
		key: 'ContactEmails',
		    CONTACT_EMAILS_LIMIT
		    }).then(clearContacts);
    }

    const load = function(type) {
	


    }    

    return { hydrate, load };
}
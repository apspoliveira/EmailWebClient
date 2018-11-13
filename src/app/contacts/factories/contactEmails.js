angular.module('webmail.contact')
    .factory('contactEmails', contactEmails);
function contactEmails(Contact) {
    const emails = [];
    
    const set = function(data) {
	emails.push(data);
    }

    /**                                                                                             
     * Load first 100 emails via the user auth process                                               
     * @return {Promise}                                                                               
     */
    const loadCache = function () {
        const list = Contact.hydrate();
        set(list);
        return fetch();
    };

    const fetch = function() {
	emails;
    }

    const clear = function() { 
	emails.length = 0;
    }

    const findIndex = function(ID) {
	_.findIndex(emails, ID);
    }

    const reset = function() {
        clear();
        return loadCache();
    };

    

    return { set, fetch, clear, findIndex, load: loadCache };
}
angular.module('webmail.contact')
    .factory('contactCache', contactCache);
function contactCache() {
    const CACHE = {
	hydrated: false,
	contacts: [],
	map: {
	    all: {},
	    selected: [],
	    filtered: []
	}
    };

    const CONTACT_STATES = ['secured.contacts'];

    function load() {
	
    }
}
angular.module('webmail.settings')
    .factory('userSettingsModel', userSettingsModel);
function userSettingsModel() {
    var CACHE = {};

    const get = function(key) {
	if (key === 'all')
	    angular.copy(CACHE);
	else 
	    angular.copy(CACHE[key]);
    }

    const set = function(key, value) {
        if (key === 'all') {
            _.extend(CACHE, value);
        } else {
            CACHE[key] = value;
        }
    };

    return { get, set };
}
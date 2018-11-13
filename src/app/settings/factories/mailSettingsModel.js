angular.module('webmail.settings')
    .factory('mailSettingsModel', mailSettingsModel);
function mailSettingsModel() {
    var CACHE = {};
    const get = function(key) {
	console.log(key);
	if (key === 'all')
	    angular.copy(CACHE);
	else
	    angular.copy(CACHE[key]);
    }
    
    const clear = function() {
	CACHE = {};
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
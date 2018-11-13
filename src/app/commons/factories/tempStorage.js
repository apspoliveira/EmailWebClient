angular.module('webmail.commons')
    .factory('tempStorage', tempStorage);
function tempStorage($timeout) {
    // This is a very simple storage object wrapper which unlinks the reference to the data after retrieval                                                              
    // or a timeout, whichever happens first. It is designed to help ensure proper garbage collection of sensitive data.                                                                                           
    // It implements the secureSessionStorage interface, though it is not restricted to strings only. 
    
    var data = {};
    const timeouts = {};
    
    function deleteKey(key) {
        return function () {
            delete data[key];
        };
    }
    
    function cancelTimeout(key) {
        if (timeouts[key]) {
            $timeout.cancel(timeouts[key]);
            delete timeouts[key];
        }
    }
    
    return {
        getItem(key) {
            if (angular.isString(key) && data[key]) {
                cancelTimeout(key);
		
                const rv = data[key];
                deleteKey(key)();
                return rv;
            }
            return null;
        },
	    
	    setItem(key, value, lifetime) {
		if (angular.isString(key)) {
		    cancelTimeout(key);
		    data[key] = value;
		    
		    // delete information if not retrieved within timeout                            
		    timeouts[key] = $timeout(deleteKey(key), lifetime, false);
		}
	    },
		
		removeItem(key) {
		    if (angular.isString(key) && data[key]) {
			cancelTimeout(key);
			delete data[key];
		    }
		},
		    
		    clear() {
			Object.keys(timeouts).forEach(cancelTimeout);
			data = {};
		    }
    };
}
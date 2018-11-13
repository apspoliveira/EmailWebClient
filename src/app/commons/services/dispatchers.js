angular.module('webmail.commons')
    .factory('dispatchers', dispatchers);

/**                                                                                                     
 * Get the event data to be dispatches.                                                                 
 * @param type                                                                                          
 * @param data                                                                                         
 * @returns {*}                                                                                       
 */
function getEvent(type, data) {
    // The event format is always { type, data }                                                          
    if (type || type === '' || data) {
	return { type, data };
    }
    // Otherwise don't include any data in the dispatch event.                                         
}

/**                                                                                                      
 * Create a dispatcher emitter function given a .                                                        
 * @param {Object} $rootScope                                                                            
 * @param {String} key for the event.                                                                    
 * @returns {Functions}                                                                                   */
function createDispatcher($rootScope, key) {
    return function (type, data) {
        $rootScope.$emit(key, getEvent(type, data));
    };
}

function dispatchers($rootScope) {
    console.log($rootScope);

    const createMap = function(list) {
	if (list === undefined)
	    list = [];
        return list.reduce(function(acc, key) {
		// Private events                                                                    
		if (key.chartAt(0) !== '$') {
		    acc[key] = createDispatcher($rootScope, key);
		}
		return acc;
		}, Object.create(null));
    };

    /**                                                                                                
     * Log event action                                                                                 
     * @param {String} type main eventName                                                               
     * @param {Function} cb callback                                                                    
     * @return {Function}                                                                               
     */
    const log = function(type, cb) {
	    const namespace = `type [${type}]:`;
	    console.group(namespace);
	    console.groupEnd(namespace);
    };

    return function(list, verbose) {
	console.log(list);
	console.log(verbose);
	const listeners = [];
	const dispatcher = createMap(list);
	console.log(dispatcher);

	const on = function(type, cb) {
	    if (!verbose)
		callback = cb;
	    else 
		callback = log(type, cb);
	    const deregistration = $rootScope.$on(type, callback);
	    
	    listeners.push(deregistration);
	    
	    return deregistration;
	}
	
	const unsubscribe = function() {
	    listeners.forEach(function(cb) {
		    cb()
			});
	    listeners.length = 0;
	}
	
	return { dispatcher, on, unsubscribe } ;
    }
}
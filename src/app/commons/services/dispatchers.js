angular.module('webmail.commons')
    .factory('dispatchers', dispatchers);
function dispatchers($rootScope) {
    function createMap(list) {
        /*return list.reduce((acc, key) => {
		// Private events                                                                    
		if (key.chartAt(0) !== '$') {
		    acc[key] = createDispatcher($rootScope, key);
		}
		return acc;
		}, Object.create(null));*/
    };

    return function(list, verbose) {
	const listeners = [];
	var list = [];
	const dispatcher = createMap(list);
	
	const on = function(type, cb) {
	    const callback = cb;
	    const deregistration = $rootScope.$on(type, callback);
	    
	    listeners.push(deregistration);
	    
	    return deregistration;
	}
	
	function unsubscribe() {
	    //listeners.forEach((cb) => cb());
	    listeners.length = 0;
	}
	
	return { dispatcher, on, unsubscribe } ;
    }
}
angular.module('webmail.authentication')
    .factory('handle9001', handle9001);
function handle9001($q, $http, humanVerificationModal) {
    return function(config) {
	const deferred = $q.defer();

	params: {
	    function close(resend) {
		if (resend) {
		    deferred.resolve($http(config));
		} else {
		    deferred.resolve();
		}
	    }
	}

	return deferred.promise;
    };
}


angular.module('webmail.authentication')
  .factory('handle401', handle401);
function handle401($http, authentication) {
    var refreshPromise = null;

    const clearPromise = function() {
	refreshPromise = null;
    }

    const logout = function (err) {
        authentication.logout(true, false);

        return Promise.reject(err);
    };

    const recall = function(config) {
        _.extend(config.headers, $http.defaults.headers.common);
	
        return $http(config);
    };

    return function(rejection) {
        if (!authentication.existingSession()) {
	       return logout(rejection);
	}
	
	if (!refreshPromise) {
            refreshPromise = authentication.getRefreshCookie()
		.then(clearPromise())
		.catch(logout());
	}

	return refreshPromise
	    .then(function() {
		    recall(rejection)
			.catch(function() {
				Promise.reject(rejection);
			    })
			});
    };
}
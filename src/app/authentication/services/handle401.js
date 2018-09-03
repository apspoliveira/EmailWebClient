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

    return function(rejection) {
	//console.log(rejection);
        /*if (!authentication.existingSession()) {
	       return logout(rejection);
	       }*/
	if (!refreshPromise) {
            refreshPromise = authentication.getRefreshCookie();
	    clearPromise();
	    //logout();
	}
    };
}
angular.module('webmail.authentication')
  .factory('authentication', authentication);

//authentication.$inject = ['$q', '$http', 'srp'];

function authentication($log, $q, $http, srp, authApi) {
    function saveAuthData(data) {
	$log.debug('saveAuthData', data);

	//secureSessionStorage.setItem(OAUTH_KEY + ':UID', data.UID);
	auth.data = _.pick(data, 'UID', 'AccessToken', 'RefreshToken');
	
	auth.setAuthHeaders();
    }

    // RUN-TIME PUBLIC FUNCTIONS                                                            
    var api = {

	getRefreshCookie() {
	    $log.debug('getRefreshCookie');
	    response = authApi.refresh();
	      
	    $log.debug(response);
	      
	    // Necessary during the transition to UIDs
	    saveAuthData(response.data);
	    
	    return response;
	},
	
	loginWithCredentials(creds, initialInfoResponse) {
	    const deferred = $q.defer();
	  
	    console.log(creds);
	    if (!creds.Username || !creds.Password) {
		deferred.reject({
			message: 'Username and Password are required to login'});
	    }
	    else {
		delete $http.defaults.headers.common.Accept;
		srp
		.performSRPRequest(
				   'POST', 
				   '/auth', 
    { 
	Username: creds.Username, 
	    ClientID: "Web", 
	    ClientSecret: "4957cc9a2e0a2a49d02475c9d013478d" }, 
				   creds, 
				   initialInfoResponse);
		/*.then(function (resp) {
			// Upgrade users to the newest auth version    
			if (resp.authVersion < passwords.currentAuthVersion) {
			    srp.getPasswordParams(creds.Password).then(function (data) {
				    upgradePassword.store(data);
				    deferred.resolve(resp);
				});
			} else {
			    deferred.resolve(resp);
			}
			// this is a trick! we dont know if we should go to unlock or step2 because we dont have user's data yet. so we redirect to the login page (current page), and this is determined in the resolve: promise on that state in the route. this is becaus we dont want to do another fetch info here.
		    },
		    function(error) {
			// TODO: This is almost certainly broken, not sure it needs to work though?    
			console.log(error);
			deferred.reject({
				message: error.error_description
				    });
		    }
		    );*/
	    }

	    return deferred.promise;
	},
	
	receivedCredentials(data) {
	    const eventManager = $injector.get('eventManager');
	    saveAuthData(data);
	    console.log(eventManager);
	    eventManager.setEventID(data.EventID);
	},
	
	// Whether a user is logged in at all                                                
	isLoggedIn() {
	    const loggedIn = false; 
	    
	    /*this.existingSession();
	      
	      if (loggedIn && auth.headersSet === false) {
	      auth.setAuthHeaders();
	      }*/
	    
	    return loggedIn;
	},
	
	state() {
	    if (this.isLoggedIn()) {
		return this.isLocked() ? 'login.unlock' : null;
	    }
	    return 'login';
	},

	logout(redirect, callApi) {

	}
    }
	
    return api;//{ loginWithCredentials, receivedCredentials, state, isLoggedIn };
}
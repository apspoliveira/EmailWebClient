angular.module('webmail')
  .factory('authentication', authentication);
function authentication($http, $rootScope, authApi, srp) {

    const auth = {
	fetchUserInfo() {
	    const promise = User.get()
	    .then(function(user) {
		if (user.data.User.Keys.length === 0) {
		    return Promise.resolve(user);
		}  
	    });
	}
    }
    
    // Param - AccessToken, RefreshToken, UID, ExpiresIn, EventID
    function receivedCredentials(data) {
    }
                                                       
    var api = {
	receivedCredentials,
	setAuthCookie(authResponse) {
	    return authApi.cookies({
		ResponseType: 'token',
		ClientID: "Web",
		GrantType: 'refresh_token',
		RefreshToken: authResponse.RefreshToken,
		UID: authResponse.UID,
		RedirectURI: '',
		State: ''
		});
	},
	loginWithCredentials(creds, initialInfoResponse) {	    
	    var params = '';
	    
	    var result = srp
	    .performSRPRequest(
			       'POST', 
		'/auth', 
		{ 
	Username: creds.Username, 
	ClientID: clientID, 
	ClientSecret: clientSecret 
    }, 
		creds, 
		initialInfoResponse);
	}
    }
    return api;
}

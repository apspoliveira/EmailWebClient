angular.module('webmail')
    .factory('authApi', authApi);
function authApi($http) {
    const requestURL = API_ENDPOINT + '/auth';
    return {
	// Param - Username, ClientID and ClientSecret, SRPSession, ClientEphemeral, ClientProof and TwoFactorCode 
        authenticate(params) {
            return $http.post(requestURL, params);
	},
	// Param - ResponseType, ClientID, GrantType, RefreshToken, UID, RedirectURI and State
	cookies(params) {
	    return $http.post(requestURL + '/cookies', params);
	},
	 // Param - Username, ClientID and ClientSecret
	info(params) {
	    return $http.post(requestURL+'/info', params);
	},
	// Returns Modulus, ModulusID
	modulus() {
	    return $http.get(requestURL+'/modulus');
	}
    };
}

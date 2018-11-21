angular.module('webmail')
    .factory('User', User);
function User($http, srp, authApi) {
    const headersVersion3 = { 'x-pm-apiversion': 3 };
    
    return {
	// Params - Username, Email, Type, TokenType, Token, Version, ModulusID, Salt, Verifier
	create(params, password) {
	    return srp.getPasswordParams(password, params).then(function (data) {
		$http.post(API_ENDPOINT+'/users', data);   
	    });
	},
	get(params) {
	    return $http.get(API_ENDPOINT, params);
	},
	available(params) {
	    return $http.get(API_ENDPOINT+'/users/available', { params: { Name:  params  }});
	}
    };
}

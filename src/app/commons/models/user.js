angular.module('webmail.commons')
    .factory('User', User);
function User($http, url, srp, authApi) {
    const headersVersion3 = { 'x-pm-apiversion': 3 };
    const requestURL = url.build('users');
    
    return {
	create(params, password) {
	    return srp.getPasswordParams(password, params).then(function (data) {
		    console.log(data);
		    $http.post(requestURL, data);   
		});
	},
	code(params) {
	    return $http.post(url.build('users/code'), params);
	},
	get(params) {
	    console.log($http.defaults.headers.common);
	    return $http.get(requestURL, params);
	},
	human() {
	    return $http.get(url.build('users/human'));
	},
	check(params) {
	    return $http.put(url.build('users/check'), params);
	},
	pubkeys(emails) {
	    return $http.get(url.build('users/pubkeys', window.encodeURIComponent(emails)));
	},	
	available(params) {
	    return $http.get(url.build('users/available'), { params: { Name:  params  }} );
	},
	direct(params) {
	    return $http.get(url.build('users/direct'), { params: params } );
	},
	lock() {
	    return $http.put(url.build('users/lock'));
	},
	unlock(creds) {
	    return srp.performSRPRequest('PUT', '/users/unlock', {}, creds);
	},
	password(creds) {
	    return srp.performSRPRequest('PUT', '/users/password', {}, creds);
	},
	delete(creds) {
	    return srp.performSRPRequest('PUT', '/users/delete', {}, creds);
	}
    };
}
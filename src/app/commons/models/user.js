angular.module('webmail.commons', [])
    .factory('User', User);

function User($http, url, srp) {
    const headersVersion3 = { 'x-pm-apiversion': 3 };
    const requestURL = url.build('users');

    function create(params, password) {
        data = srp.getPasswordParams(password, params);
	//console.log(promise);
	//promise.then(function (data) {
	//console.log(params);
	
	$http.post(requestURL, data);
	//  });
    }

    function get() {
	console.log( 
	   $http.get(requestURL, {
                headers: headersVersion3
		       }));
    }

    /*return {
	create(params, password) {
	    console.log('user create');
	    //return srp.getPasswordParams(password, params).then((data) => $http.post(requestURL(), data));
        },
	};*/
    return { create, get };
}
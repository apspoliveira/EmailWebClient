angular.module('webmail.authentication')
  .factory('authHttpResponseInterceptor', authHttpResponseInterceptor);
function authHttpResponseInterceptor($q, $injector, $rootScope) {
    return {
	response(response) {
	    //console.log(response);
	    if (angular.isDefined(response.data) && angular.isDefined(response.data.Code)) {
		// app update needd  
		if (response.data.Code === 5003) {
		}
		else if (response.data.Code === 5004) {
		}
		else if (response.data.Code === 5005) {
		    // unsupported api   
		    
		}
		else if (response.data.Code === 7001) {
		    // site offline 
		}
		else if (response.data.Code === 9001) {
		}
	    }
	    return response || $q.when(response);
	},
	responseError(rejection) {
	    //console.log(rejection);
	    if ((rejection.status === 0 || rejection.status === -1))
	    {
	    }
	    else if (rejection.status === 401) {
		const handle401 = $injector.get('handle401');
		//console.log(handle401(rejection));
	    }
	    else if (rejection.status === 403) {
	    }
	    else if (rejection.status === 504) {
	    }
	    else if ([408, 503].indexOf(rejection.status) > -1) {
	    }
	    return $q.reject(rejection);
	}
    };
}
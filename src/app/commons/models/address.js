angular.module('webmail')
    .factory('address', address);
function address($http) { 
    
    // Param - Domain
    const setup = function(params) {
	return $http.post(API_ENDPOINT+'/addresses/setup', params);
    };

    return { setup }; 
}

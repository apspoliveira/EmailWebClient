angular.module('webmail.commons')
    .factory('address', address);
function address($http, url, $location, $q) { 
	
    //console.log(url);
    const requestUrl = url.build('addresses');

    /**                                                                                     
     * Add an address to a domain, returns {address_id} if successful, group address limit and usage                                                                                           
     * @param {Object} address                                                                 
     * @return {Promise}                                                                       
     */
    const setup = function(params) {
	//console.log('setup');
	//console.log(requestUrl);
	//console.log(params);
	//console.log(url.build('loginForm'));
	//console.log($http.defaults);
	//console.log(params); 
	
	$http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

	//console.log($http.defaults);

	//$http.post(url.build('setup'));
	//requestUrl('setup'))/*, params)*/;

	//method = 'POST';
	//path = 'index.html#!/loginForm';
	/*$http({method: method, url: path}).then(function(response) {
		$location.url('/loginForm');
		//data = response.data;
		//console.log(data);
		});*/
	
	/*$http.post(path, {}, {
		transformRequest: angular.identity,
		headers: {
		    'Content-Type': false 
			}
			});*/
    }; 
    return { setup }; 
}
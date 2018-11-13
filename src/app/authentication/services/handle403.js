angular.module('webmail.authentication')
    .service('handle403', handle403);
function handle403($http, $q, loginPasswordModal, User, signupModel, authentication) {
    return function(config) {
	console.log('handle 403');

	// Open the open or enter login password because this request require lock scope            
        loginPasswordModal.activate({
		params: {
		    submit(Password, TwoFactorCode) {

			const deferred = $q.defer();
			
			// Send request to unlock the current session for administrator privileges  
			const promise = User.unlock({ Password, TwoFactorCode })
			    .then(function() {
				    // Resend request now   
				    deferred.resolve($http(config));
				});
		    },
			cancel() {
			    loginPasswordModal.deactivate();
			    
			    // usefull for networkManager tracker                                                 
			    deferred.reject(new Error('loginPassword:cancel'));
			}
		}
	    });
	return deferred.promise;
    }
}
angular.module('webmail')
    .controller('LoginController', LoginController);
function LoginController($scope, authentication, authApi) {

    function login(username, password, initialInfoResponse) {
	var promise = authentication 
	    .loginWithCredentials(
				  {
				      Username: username, 
				      Password: password 
				  },
		initialInfoResponse 
	    );
	    /*.then(
		function(result) {
		    authentication.receivedCredentials({
			AccessToken: result.data.AccessToken, 
			RefreshToken: result.data.RefreshToken, 
			UID: result.data.Uid, 
			ExpiresIn: result.data.ExpiresIn,
			EventID: result.data.EventID 
		    });
		    authentication  
			.setAuthCookie(result.data) 
		});*/
    }
    
    $scope.enterLoginPassword = function() {
	const username = $scope.user.name;
	const password = $scope.user.password;
	
	const usernameLowerCase = username.toLowerCase();
	const passwordEncoded = openpgp.util.encode_utf8(password);
	const Username = usernameLowerCase;

	var params = {
	    Username,
	    ClientID: clientID,
	    ClientSecret: clientSecret
	};
	authApi.info(params).then(function(resp) {
	    $scope.initialInfoResponse = resp;
	    login(usernameLowerCase, password, $scope.initialInfoResponse);
	});
    };   
}

angular.module('webmail')
    .factory('signupUserProcess', signupUserProcess);
function signupUserProcess(signupModel, address, authentication) {
  
    function doCreateUser(model) {
	const data = signupModel.createUser(model);
	return data;
    }

    function doLogUserIn() {
	
	return authentication.loginWithCredentials({
	    Username: signupModel.get('username'), 
	    Password:    signupModel.getPassword()
	})
	    .then(function (data) {
		    authentication.receivedCredentials(data);
		    
		    authentication.setAuthCookie(data);
		    return authentication.fetchUserInfo();
	    });
    }

    function doAccountSetup() {
	const data = address.setup({ Domain: signupModel.getDomain()});
	
	return data;
    }
    
    function doGetUserInfo() {
        return authentication.fetchUserInfo();
    }

    function createAddress() {
	doLogUserIn();
	   
	doAccountSetup();
    }
    
    function create(model) {
	doCreateUser(model);
	createAddress();

	return doGetUserInfo();
    }
    
    const createAccount = function(model) {
	create(model);
    }

    return { createAccount };
};

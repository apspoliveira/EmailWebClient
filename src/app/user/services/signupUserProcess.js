angular.module('webmail.user')
    .factory('signupUserProcess', signupUserProcess);
function signupUserProcess($rootScope, signupModel, address, authentication, srp) {
    const CACHE = {};
    const dispatch = function(type, data) {
	$rootScope.$emit('signup', { type, data });
    }

    const I18N = {
        ERROR_ADDRESS_CREATION: 'Something went wrong during address creation',
        ERROR_PROCESS: 'Something went wrong'
    };

    function doCreateUser(model) {
	dispatch('create.user', { value: true });
	try {
	    const data = signupModel.createUser(model);
	    return data;
	} catch (e) {
	    const data = e;
	    // Failed Human verification                                                                  
            if (data.Code === 12087) {
		window.alert('failed human verification');
                dispatch('creating', { value: false });
                dispatch('chech.humanity', { value: true });
		
		return Promise.reject({
			error: new Error(data.Error),
			    verbose: false
			    });
            }
	    
	    return Promise.reject({
		    error: new Error(e.Error),
			verbose: true
			});
	}
    }

    function doLogUserIn() {
	dispatch('loguserin', { value: true });

	return authentication.loginWithCredentials({
		Username: signupModel.get('username'), 
		    Password:    signupModel.getPassword()
		    })
	    .then(function (data) {
		    authentication.receivedCredentials(data);
		    
		    authentication.setAuthCookie(data);
		    return authentication.fetchUserInfo();
	    })
	    then(function() {
		    $rootScope.isLoggedIn = authentication.isLoggedIn();
		    $rootScope.isSecure = authentication.isSecured();
		});
    }

    function doAccountSetup() {
	dispatch('setup.account', { value: true });
	
	try {
	    //const data = address.setup({ Domain: signupModel.getDomain()});

	    //return data;
	} catch (err) {
	    const data = err;
            if (data.Error) {
                throw new Error(data.Error);
            }
            throw err;
        }
    }
    
    function doGetUserInfo() {
        dispatch('user.get', { value: true });
	lazyLoader.app();
        return authentication.fetchUserInfo();
    }

    function createAddress() {
	try {
	   
	    doLogUserIn();
	   
	    /*.then(*/doAccountSetup()/*)*/;
	} catch (e) {
	    const data = e;
            if (data.Error) {
                return Promise.reject({
			error: new Error(data.Error || I18N.ERROR_ADDRESS_CREATION),
			    verbose: true,
			    redirect: 'login'
			    });
            }
	    
	    throw e;
	}
    }
    
    function create(model) {
	try {
	    //console.log(doCreateUser(model));
	    createAddress();

	    //return doGetUserInfo();
	} catch (e) {
	    throw e;
	}
    }
    
    const createAccount = function(model) {
	create(model);
    }

    return { createAccount };
};
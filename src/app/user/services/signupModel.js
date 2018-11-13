angular.module('webmail.user')
    .factory('signupModel', signupModel);

function signupModel(User, $stateParams, $location, $rootScope) {
    const CACHE = {};
    const dispatch = function(type, data) {
	$rootScope.$emit('signup', { type, data });
    }

    const get = function (key) {
        const item = angular.copy(CACHE['model']);
	return key ? (item || {})[key] : item;
    };
    
    const getDomain = function () {
	const item = get('domain')
	return item;
    };
    
    const store = function (data) {
	CACHE.model = angular.copy(data);
    };

    const set = function (key, value) {
	CACHE['model'][key] = angular.copy(value);
    };
    
    const getPassword = function() {
	const login = get();
        return login.password;
    };

    const getOptionsVerification = function(Type) {
	if (CACHE.humanCheck) {
            return Promise.resolve(CACHE.humanCheck);
        }

	if ($stateParams.inviteToken) {
            return Promise.resolve({ invitation: true });
        }
	
	return User.direct(Type)
	.then(function(data) {
		if (data.Direct === 1) {
                    return (CACHE.humanCheck = {
			    email: _.includes(data.VerifyMethods, 'email'),
			    captcha: _.includes(data.VerifyMethods, 'captcha'),
			    sms: _.includes(data.VerifyMethods, 'sms')
			});
                }
		
		console.log(data);
		return data;
            })
	.catch(function(err) {
                const data = err;

                if (data.Error) {
                    throw new Error(data.Error);
		}

                throw err;
	    });
    }

    const createUser = function(model) {
	
	console.log(model);

	const params = {
            Username: get('username'),
            Email: get('notificationEmail'),
	    Type: get('Type'),
	    Referrer: $location.search().ref
        };

	if (model.smsCodeVerification != "") {
	    params.Token = model.smsCodeVerification; // 423474    
	    params.TokenType = 'sms';
	}
	else if (model.codeVerification != "") {
	    params.Token = model.codeVerification; //084826
	    params.TokenType = 'email'; // apspoliveiraipn@gmail.com
	}
	
      	User.check({ Token: params.Token, TokenType: params.TokenType });
	
	User.available(params.Username).then(function(data) {
	       
		if (data.data.Status == 0) {
		    User.create(params, getPassword());
		}
		else
		    throw new Error('Username not available');
	    });
    }

    return { get, set, store, getDomain, getPassword,  getOptionsVerification, createUser }; 
}
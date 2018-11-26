angular.module('webmail')
    .factory('signupModel', signupModel);

function signupModel(User, $rootScope) {
    const CACHE = {};

    const get = function (key) {
        const item = angular.copy(CACHE['model']);
	return key ? (item || {})[key] : item;
    };
    
    const store = function (data) {
	CACHE.model = angular.copy(data);
    };

    const set = function (key, value) {
	CACHE['model'][key] = angular.copy(value);
    };
    
    const createUser = function(model) {
	
	const params = {
            Username: get('username'),
            Email: get('notificationEmail'),
	    Type: get('Type')
        };
	
	if (model.smsCodeVerification != "") {
	    params.Token = model.smsCodeVerification; 
	    params.TokenType = 'sms';
	} 
	else {
	    params.Token = 111111; //model.codeVerification;
	    params.TokenType = 'email';
	};
	
	User.available(params.Username).then(function(data) {
	    console.log(User.create(params, getPassword()));
	});
    }
    
    return { get, set, store, createUser }; 
}

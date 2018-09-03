angular.module('webmail.user')
    .factory('signupModel', signupModel);

signupModel.$inject = ['User', '$location', '$rootScope'];

function signupModel(User, $location, $rootScope) {
    const CACHE = {};

    function get(key) {
        const item = angular.copy(CACHE['model']);
        //console.log(item);
	//console.log(key);
	return key ? (item || {})[key] : item;
    };

function getDomain () {
    const item = get('domain')
    return item;
};

function store(data) {
    //console.log('store');
    //console.log(data);
    CACHE.model = angular.copy(data);
};

function set(key, value) {
    CACHE['model'][key] = angular.copy(value);
};

    function getPassword() {
        //console.log('get password');
	const login = get();
	//console.log(login.password);
        return login.password;
    };

    function createUser(model) {
	const params = {
	    //Domain: get('domain'),
            Username: get('username'),
            Email: get('notificationEmail'),
	    Type: get('Type'),
	    //Password: get('password'),
	    Referrer: $location.search().ref
        };
	
	//srp.getPasswordParams(password, params).then((data) => $http.post(requestURL(), data));
	//User.get();
	//return User.create(params, getPassword());
   }

    return { get, set, store, getDomain, getPassword, createUser }; 
}
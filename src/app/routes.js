angular.module('webmail')
    .config(function($routeProvider) {
	$routeProvider.when('/signup', {
	    templateUrl: 'views/signup.html'
	})
	    .when('/login', {
		controller: 'LoginController',
		templateUrl: 'views/login.html'
	    })
	    .when('/login/setup', {
                controller: 'SetupController',
                templateUrl: 'views/setup.html'
	    })
	    .when('/secured/inbox', {
		controller: 'ElementsController',
		templateUrl: 'partials/conversations.html'
            })
	    .when('/secured', {
		controller: 'SecuredController',
		templateUrl: 'layout/secured.html'
	    })
	    .otherwise('/login');
    });


angular.module('webmail')
    .config(function($routeProvider) {
	$routeProvider.when('/signup', {
	    controller: 'SignupController',
	    templateUrl: 'templates/views/signup.html'
	})
	    .when('/login', {
		controller: 'LoginController',
		templateUrl: 'templates/views/login.html'
	    })
	    .when('/account', {
		templateUrl: 'templates/views/account.html'
	    })
	    .when('/appearance', {
		templateUrl: 'templates/views/appearance.html'
	    })
	    .when('/help', {
		templateUrl: 'templates/views/help.html'
	    })
	    .when('/identity', {
		    templateUrl: 'templates/views/identity.html'
			})
	    .when('/message', {
                    templateUrl: 'templates/message/message.html'
                        })
	    .when('/send', {
                    templateUrl: 'templates/composer/send.html'
                        })
	    .when('/login/setup', {
		controller: 'SetupController',
		templateUrl: 'templates/views/setup.html'
	    })
	    .when('/secured/inbox', {
		controller: 'ElementsController',
		templateUrl: 'templates/partials/conversations.html'
	    })
	    .when('/secured', {
		controller: 'SecuredController',
		templateUrl: 'templates/layout/secured.html'
	    })
	    .otherwise('/login');
    });

angular.module('webmail.routes', ['ui.router'])
    .config(function($stateProvider) {
	    $stateProvider.state('signup', {
		    url: '/create',                                                        
			templateUrl: 'layout/auth.html',
		})
	})
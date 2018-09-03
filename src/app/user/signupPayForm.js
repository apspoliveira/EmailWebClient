'use strict';

angular.module('webmail.user.signupPayForm', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/signupPayForm', {
			templateUrl: 'user/signupPayForm.html',
			    controller: 'SignupPayFormController'
			    });
	    }])

    .controller('SignupPayFormController', [function() {

	    }])
    .directive('signupPayForm', function() {
            return {
                templateUrl: 'user/signupPayForm.html'
                    }
        });
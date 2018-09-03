'use strict';

angular.module('webmail.user.signupHumanForm', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/signupHumanForm', {
			templateUrl: 'user/signupHumanForm.html',
			    controller: 'SignupHumanFormController'
			    });
	    }])

    .controller('SignupHumanFormController', [function() {

	    }])
    .directive('signupHumanForm', function() {
            return {
                templateUrl: 'user/signupHumanForm.html'
                    }
        });
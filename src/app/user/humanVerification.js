'use strict';

angular.module('webmail.user.humanVerification', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/humanVerification', {
			templateUrl: 'user/humanVerification.html',
			    controller: 'humanVerificationController'
			    });
	    }])

    .controller('humanVerificationController', [function() {

	    }])
    .directive('humanVerification', function() {
            return {
                templateUrl: 'user/humanVerification.html'
                    }
        });
'use strict';

angular.module('bugReport', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/newBugReport', {
    templateUrl: 'bugReport/newBugReport.html',
    controller: 'NewBugReportController'
  });
}])

.controller('NewBugReportController', [function() {

}])
    .directive('newBugReport', function() {
            return {
                templateUrl: 'bugReport/newBugReport.html'
                    }
        });

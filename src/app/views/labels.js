'use strict';

angular.module('labels', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/labels', {
    templateUrl: 'views/labels.html',
    controller: 'LabelsController'
  });
}])

.controller('LabelsController', [function() {

}]);

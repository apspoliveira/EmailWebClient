angular.module('webmail.labels')
    .directive('createLabel', createLabel);
function createLabel($rootScope) {
    return {
        replace: true,
	    restrict: 'E',
	    templateUrl: 'labels/directives/createLabel.html'
	    }
}
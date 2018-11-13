angular.module('webmail.elements')
    .directive('labelsElement', labelsElement);
function labelsElement () {
    return {
	templateUrl: 'elements/directives/labelsElement.html'
    }
}
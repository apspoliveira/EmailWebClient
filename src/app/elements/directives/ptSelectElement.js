angular.module('webmail.elements')
    .directive('ptSelectElement', ptSelectElement);
function ptSelectElement() {
    return {
	templateUrl: 'elements/directives/ptSelectElement.html'
    }
}
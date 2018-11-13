angular.module('webmail.elements')
    .directive('foldersElement', foldersElement);
function foldersElement() {
    return {
	templateUrl: 'elements/directives/foldersElement.html'
	    }
}
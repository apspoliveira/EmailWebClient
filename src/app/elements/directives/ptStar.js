angular.module('webmail.elements')
    .directive('ptStar', ptStar);
function ptStar() {
    return {
	templateUrl: 'elements/directives/ptStar.html'
    }
}
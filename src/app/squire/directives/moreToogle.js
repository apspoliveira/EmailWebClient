angular.module('webmail.composer')
    .directive('moreToggle', moreToggle);
function moreToggle() {
    return {
	templateUrl: 'squire/directives/moreToggle.html'
	    }
}
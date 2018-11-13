angular.module('webmail.ui')
    .directive('customCheckbox', customCheckbox);
function customCheckbox () {
    return {
	replace: true,
	    templateUrl: 'ui/directives/customCheckbox.html'
	    }
}
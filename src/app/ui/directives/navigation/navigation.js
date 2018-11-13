angular.module('webmail.ui')
    .directive('navigation', navigation);
function navigation() {
    return {
	restrict: 'E',
	    replace: true,
	    templateUrl: 'ui/navigation/navigation.html',
	    link(scope, element) {
	    
	}
    }
}
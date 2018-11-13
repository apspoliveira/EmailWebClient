angular.module('webmail.ui')
    .directive('title', title);
function title(pageTitlesModel, $state) {
    
    return {
        restrict: 'E',
	    scope: {},
	    link(scope, el) {
		
	    }
    }
}
angular.module('webmail.ui')
    .directive('toggle', toggle);
function toggle($rootScope) {
    const I18N = {
        YES: 'Text displays in the toggle component, make it shorter as possible',
        NO: 'Text displays in the toggle component, make it shorter as possible',
        ON: 'Text displays in the toggle component, make it shorter as possible',
        OFF: 'Text displays in the toggle component, make it shorter as possible'
    };
    
    return {
        restrict: 'E',
	    replace: true,
	    templateUrl: 'ui/directives/toggle.html',
	    scope: {
            id: '@', // ID if uniq logic needed                                                      
		status: '=', // status value                                                         
		name: '@' // event name called                                                       
		},
	    
	    },
	link(scope, element, on, off) {
	    scope.on = I18N[on];
            scope.off = I18N[off];

	    function onClick() {
                scope.$applyAsync(function() {
			scope.status = !scope.status;
			if (scope.name) {
			    $rootScope.$emit(scope.name, { status: scope.status, id: scope.id });
			}
		    });
            }
	}
}
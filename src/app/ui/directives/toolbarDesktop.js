angular.module('webmail.ui')
    .directive('toolbarDesktop', toolbarDesktop);
function toolbarDesktop(mailSettingsModel) {
    return {
	replace: true,
	    templateUrl: 'ui/toolbarDesktop.html',
	    link(scope) {
	    
	    const updateView = function() {
                const ViewLayout = mailSettingsModel.get();
                scope.$applyAsync(function() {
			scope.viewLayout = ViewLayout;
		    });
            };
	    
	    updateView();
	}
    }
}
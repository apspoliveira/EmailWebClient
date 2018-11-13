angular.module('webmail.settings')
    .directive('chooseComposerMode', chooseComposerMode);
function chooseComposerMode() {
    const KEY = 'DraftMIMEType';

    return {
        replace: true,
	    scope: {},
	    templateUrl: 'settings/directives/chooseComposerMode.html',
	    link(scope, el) {
	    
	    const onChange = function(target) {
		
	    }

	    el.on('change', onChange);

	    scope.$on('$destroy', function() {
		    el.off('change', onChange);
		});
	}
    }
}
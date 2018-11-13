angular.module('webmail.utils')
    .directive('mailtoHandler', mailtoHandler);
function mailtoHandler() {
    const onClick = function(e) {
        // We only handle anchor that begins with `mailto:`                                          
	if (e.target.nodeName === 'A' && (e.target.getAttribute('href') || '').toLowerCase().startsWith('\
mailto:')) {
            e.preventDefault();
        }
    };


    return {
	link(scope) {
            document.body.addEventListener('click', onClick);
	
	    scope.$on('$destroy', function() {
		    document.body.removeEventListener('click', onClick);
		});
	}
    }
}
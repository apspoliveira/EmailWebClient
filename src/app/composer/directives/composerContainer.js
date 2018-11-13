angular.module('webmail.composer')
    .directive('composerContainer', composerContainer);
function composerContainer(authentication) {
    return {
        link(scope, el) {
	    const openClose = function(type, data) {
		scope.$applyAsync(function() {
			
		    });
	    }
	}
    }
}
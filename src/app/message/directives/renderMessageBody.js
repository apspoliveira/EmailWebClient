angular.module('webmail.message')
    .directive('renderMessageBody', renderMessageBody);
function renderMessageBody($rootScope) {
    return {
        link(scope, el) {
            // Render the loader   
	    
	    const onAnimationStart = function(animationName) {
		if (animationName === 'nodeInserted') {

		}
	    }

	    const onAnimationEnd = function(animationName) {
		if (animationName === 'nodeInserted') {
		    scope.$applyAsync(function() {
			    $rootScope.$emit('message.open', {
				    type: 'render'
				});
			});
		}
	    }

	    el[0].addEventListener('animationstart', onAnimationStart, false);
	    el[0].addEventListener('animationend', onAnimationEnd, false);
	
	    // update the body after every update of the decryptedBody                                 
	    const unsubscribe = scope.$watch('body', function() {
		    scope.$applyAsync(function() {
			});
		});

	    scope.$on('$destroy', function() {
		    el[0].removeEventListener('animationstart', onAnimationStart, false);
		    el[0].removeEventListener('animationend', onAnimationEnd, false);

		    

		});
	}
    }
}
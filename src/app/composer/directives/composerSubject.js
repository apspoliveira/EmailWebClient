angular.module('webmail.composer')
    .directive('composerSubject', composerSubject);
function composerSubject () 
{
    return {
	replace: true,
	    templateUrl: 'composer/directives/composerSubject.html',
	    link(scope, el) {
	    const $input = el[0].querySelector('input');

	    const onFocus = function() {
		scope.$applyAsync(function() {
			scope.message.autocompletesFocussed = false;
			scope.message.ccbcc = false;
			scope.message.attachmentsToggle = false;
		    });

		console.log(scope);
	    };

	    const onKeydown = _.throttle(function(e) {
		    // TAB                                                                          
		    if (e.which !== 9) {
			return;
		    }
		    console.log(scope);

		    if (scope.message.MIMEType === PLAINTEXT) {
			// todo make this an event?                                                               
			e.preventDefault();
			return el
			.parents('.composer')
			.find('textarea')
			.focus();
		    }

		    console.log(scope);
		}, 150);
	 
	    const onBlur = function(relatedTarget) {
		// If the target that gained focus was the discard button, don't save the draft.    
		if (relatedTarget && relatedTarget.classList.contains('composer-btn-discard')) {
		    return;
		}
		scope.$applyAsync(function() {
			// don't trigger the save of this message in case it is due to the composer closing.      
			// In this case the message has already been saved.                                       
			if (scope.$$destroyed) {
			    return;
			}
			console.log(scope);
			scope.saveLater(scope.message);
		    });
		console.log(scope);
	    };

	    $input.addEventListener('focus', onFocus, true);
	    $input.addEventListener('keydown', onKeydown, false);
	    $input.addEventListener('blur', onBlur, false);

	    scope.$on('$destroy', function() {
		    $input.removeEventListener('focus', onFocus, true);
		    $input.removeEventListener('keydown', onKeydown, false);
		    $input.removeEventListener('blur', onBlur, false);
		});   
	}
    }
}
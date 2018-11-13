angular.module('webmail.composer')
    .directive('composerInputMeta', composerInputMeta);
function composerInputMeta () 
{
    /**                                                                                             
     * Generate a uniq name identifier for the input                                                  
     * @param {String} label                                                                          
     * @return {String}                                                                               
     */
    const getNameAutocomplete = function(label) {
        const id = Math.random()
	.toString(32)
	.slice(2, 12);
        return `composerAutocomplete${label}${id}`;
    };
    
    return {
	replace: true,
	    templateUrl: 'composer/directives/composerInputMeta.html',
	    compile(element, { label, key }) {
            const $label = element[0].querySelector('.composerInputMeta-label');
            const $input = element[0].querySelector('.composerInputMeta-autocomplete');
	    $label && ($label.textContent = label);

	    // Bind the model to the autocomplete                                       
            if ($input) {
                $input.setAttribute('data-name', getNameAutocomplete(label));
                $input.setAttribute('data-emails', `message.${key}`);
            }
	    
	    return function(scope, el) {
                const isCurrentMsg = function() { 
		    scope.message.ID === scope.selected.ID;
		}
		
		const $btn = el[0].querySelector('.composerInputMeta-overlay-button');
		
		const onClick = function(target) {
                    // Allow the user to select the text inside the autocomplete box cf WebClient#41 
		    if (target.classList.contains('autocompleteEmails-label')){
                        return;
                    }
		    
		    scope.$applyAsync(function() {
			    scope.selected.autocompletesFocused = true;

			    if (containsBCC(scope.selected)) {
				scope.message.ccbcc = true;
				scope.message.attachmentsToggle = true;
			    }
			});

		    console.log(scope);
		};

		const onClickBtn = function(e) {
                    e.stopPropagation(); // Prevent collision with the onClick itself                     
                    if (isCurrentMsg()) {
                        scope.$applyAsync(function() {
				scope.message.ccbcc = !scope.message.ccbcc;
				scope.message.autocompletesFocused = true;
				scope.message.attachmentsToggle = false;
			    });
                    }

		    console.log(scope);
                };

		$btn.addEventListener('click', onClickBtn, false);
                el.on('click', onClick);

                scope.$on('$destroy', function() {
			$btn.removeEventListener('click', onClickBtn, false);
			el.off('click', onClick);
		    });
	    }
	}
    }
}
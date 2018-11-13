angular.module('webmail.composer')
    .directive('composerSelectFrom', composerSelectFrom);
function composerSelectFrom (composerFromModel) 
{
    return {
	scope: {
            message: '=model'
		},
	    replace: true,
	    templateUrl: 'composer/directives/composerSelectFrom.html',
	    link(scope, el) {
	    const $select = el.find('select');
	    const addresses = composerFromModel.get(scope.message);

	    var previousAddress = scope.message.From;

	    const onChange = function() {
                if (scope.message.From.Send === 0) {
                    scope.$applyAsync(function() {
			    scope.message.From = previousAddress;
			});
                }
		
                scope.$applyAsync(function() {
			previousAddress = scope.message.From;
		    });
            };

	    /**                                                                                    
	     * For some reason IE focus is lost                                                       
	     * cause a rendering bug of the options widths                                           
	     */
            const onMouseDown = function() {
		$select.focus();
	    }
	}
    }
}

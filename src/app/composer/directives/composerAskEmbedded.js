angular.module('webmail.composer')
    .directive('composerAskEmbedded', composerAskEmbedded);
function composerAskEmbedded () 
{
    return {
	templateUrl: 'composer/directives/composerAskEmbedded.html',
	    link(scope, el, action) {
	    const key = ['attachment.upload', action].filter(Boolean).join('.');
	    
	    const $title = el[0].querySelector('.composerAskEmbedded-title');
	    
	    /**                                                                                    
	     * Trigger an action onclick                                                         
	     *      For cancel button, as the composant is displayed by                             
	     *      the composer itself, it's closed by the composer                                
	     * @param {Node} options.target                                                          
	     * @return {void}                                                                        
	     */
            const onClick = function(target) {
                console.log('on click');
		
		if (target.nodeName === 'BUTTON') {
		    
                }
            };

	    el.on('click', onClick);
	    
	    scope.$on('$destroy', function() {
		    el.off('click', onClick);
		});
	}
    }
}
angular.module('webmail.squire')
    .directive('squire', squire);
function squire() {
    return {
	scope: {
            message: '=?', // body                                                
		value: '=?', // body                                                                
		allowEmbedded: '=',
		allowDataUri: '='
		},
	    templateUrl: 'squire/directives/squire.html',
	    link(scope, el) {
	    var typeContent = '';
	    var action = '';
	    var id = 'composer';

	    scope.data = {};
            const $iframe = el.find('iframe.squireIframe');
            $iframe[0].id = `${id}${Date.now()}`;
	    
	    const setEditorLoaded = function() {
                el[0].classList.add(CLASS_NAMES.LOADED);
                scope.$applyAsync(function() {
			scope.isLoaded = true;
		    })
            };

	    // Set the editor mode type data attribute, hides the plaintext editor or squire editor in CSS while doing so.                                                                                 
	    const setEditorModeType = function(mode) {
		el[0].dataset.editorMode = mode;
	    }

	    if (!isMessage(typeContent)) {
                scope.message = { ID: id, isPlainText: _.noop };
            }

	    /**                                                                                     
	     * Update the value of the message and send the state to the application               
	     * @param {String} val          Body                                                      
	     * @param {Boolean} dispatchAction Send the state to the app, default false.              
	     * @param {Boolean} forceUpdate    Force update the message for the mode plain-text (prevent issue #6530)                                                                                        
	     * @return {void}                                                                      
	     */
            function updateModel(val, dispatchAction, forceUpdate) {
                // Sanitize the message with the DOMPurity config.                                  
		
                scope.$applyAsync(function() {
			if (scope.message.MIMEType === PLAINTEXT) {
			    console.log(scope.message);
			    // disable all updates if in plain text mode                              
			    return scope.message.setDecryptedBody(val, false);
		    }
		    
		    const isEmpty = !value.trim().length;
		    el[0].classList[`${isEmpty ? 'remove' : 'add'}`]('squire-has-value');
		    
		    if (isMessage(typeContent)) {
			
			
			return;
		    }

		    // We can work onto a string too                                           
		    scope.value = value;
		    });    	   	    
	    }

	    function onLoadEditor(editor) {
                const unsubscribe = [];
		

	    }
	}
    }
}
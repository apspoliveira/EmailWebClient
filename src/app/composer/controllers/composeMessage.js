angular.module('webmail.composer')
    .controller('ComposeMessageController', ComposeMessageController);
function ComposeMessageController($scope, $timeout, authentication, composerRequestModel, $rootScope, embedded, mailSettingsModel, messageBuilder, messageModel, postMessage, messageApi, sendMessage, validateMessage) {
    const on  = dispatchers(['composer.update', 'messageAction']);

    $scope.message = [];
    $scope.uid = 1;
    
    /**                                                                                             
     * Bind the From configuration to a message and update the Address ID if we need to             
     * @param {Object}                                                                               
     * @return {Object}                                                                            
     */
    function bindFrom(message) {
	
        return {
            From: '',
		AddressID: ''
		};
    }
    
    /**                                                                                               
     * Add message in composer list                                                                  
     * @param {Object} message                                                                      
     */
    function initMessage(message) {
	if (mailSettingsModel.get('ComposerMode') === 1) {
	    message.maximized = true;
	}
	
	message.attachmentsToggle = message.Attachments.length - message.NumEmbedded > 0 && message.Attachments.length > message.NumEmbedded;
	message.ccbcc = false;
	message.autocompletesFocussed = false;
	
	message.uid = $scope.uid++;
        message.pendingAttachments = [];
        message.askEmbedding = false;
        delete message.asEmbedded;
        message.uploading = 0;
        message.sending = false;
	
	$scope.$applyAsync(function() {
		const size = $scope.messages.unshift(message);
		
	    });
    }
    
    $scope.save = function(message, notification, autosaving) {
	console.log(message);
        const msg = messageModel(message);
	console.log(msg);
	return embedded.parser(msg, { direction: 'cid' }).then(function(result) {
		console.log(result);
		msg.Body = result;
		return postMessage(msg);
	    })
    };
    
    function dispatchMessageAction(message) {
        $rootScope.$emit('actionMessage', { data: message });
    }
    
    $scope.togglePanel = function(message, panelName) {
        if (message.displayPanel === true) {
            $scope.closePanel(message);
        } else {
            $scope.openPanel(message, panelName);
        }
	console.log($scope);
    };

    $scope.openPanel = function(message, panelName) {
        message.displayPanel = true;
        message.panelName = panelName;
	
        if (panelName === 'encrypt') {
            $timeout(function() {
		    angular.element('#uid' + message.uid + ' input[name="outsidePw"]').focus();
		}, 100, false);
        }
	console.log(message);
    };

    $scope.closePanel = function(message) {
        message.displayPanel = false;
        message.panelName = '';
	
	console.log(message);
    };
    
    /**                                                                                            
     * Delay the saving                                                                            
     * @param {Object} message                                                                       
     */
    $scope.saveLater = function(message) {
        if (message.sending || message.discardDontAutoSave) {
            return;
        }
        postMessage(message, { autosaving: true, loader: false });
    };
    
    /**                                                                                           
     * Try to send message specified                                                               
     * @param {Object} message                                                                      
     */
    $scope.send = function (msg) {
	console.log(msg);
	
	// Prevent mutability        
	const message = messageModel(msg);
	
	console.log(message);
	
	message.Password = message.Password || '';
	
	dispatchMessageAction(message);
	
	message.setDecryptedBody(msg/*.getDecryptedBody()*/, false);

	sendMessage(message);
    }
    
    $scope.minimize = function(message) {
        message.minimized = true,
        message.previousMaximized = message.maximized;
        message.maximized = false;
        message.ccbcc = false;
	
        // Hide all the tooltip                                                                        
	$('.tooltip')
	.not(this)
	.hide();
	
	console.log(message);
    };
    
    $scope.unminimize = function(message) {
        message.minimized = false;
        message.maximized = message.previousMaximized;
	
        // Hide all the tooltip                                                                       
	$('.tooltip')
	.not(this)
	.hide();
	
	console.log(message);
    };
    
    $scope.normalize = function(message) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isSmall = width <= 640 || height <= 500;
	
        message.minimized = false;
        message.maximized = isSmall;
	
	console.log(message);
    };
    
    $scope.openCloseModal = function(message, discard) {
        $scope.close(message, discard, !discard);
    };
    
    /**                                                                                            
     * Remove a message from the list of messages                                                   
     * @param {Array} list      List of messages                                                    
     * @param {Ressource} message Message to remove                                                  
     * @return {Array}                                                                              
     */
    function removeMessage(list, message) {
	return list.filter(function(item) {
		message.ID !== item.ID
		    });
    }
    
    /**                                                                                                
     * Close the composer window                                                                      
     * @param {Object} message                                                                      
     * @param {Boolean} discard                                                                   
     * @param {Boolean} save                                                                        
     */
    $scope.close = closeComposer;
    function closeComposer(msg, discard, save) {
        const message = messageModel(msg);
	console.log(message);

        const process = function() {
	    console.log($scope);
            // Remove message in composer controller                                                 
            composerRequestModel.clear(message);
	    
            // Hide all the tooltip                                                                   
	    $('.tooltip')
	    .not(this)
	    .hide();  
        };

        if (discard === true) {
            const ids = [message.ID];
	}

        if (save === true) {
	    console.log(message);
            postMessage(message, { autosaving: true });
	    process();
        } else {
            process();
        }
    }    
}
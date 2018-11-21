angular.module('webmail')
    .controller('ComposeMessageController', ComposeMessageController);
function ComposeMessageController($scope, authentication, $rootScope, messageModel, messageApi) {

    $scope.message = [];
    $scope.uid = 1;
    
    function bindFrom(message) {
	
        return {
            From: '',
		AddressID: ''
		};
    }
    
    function initMessage(message) {
	
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
        const msg = messageModel(message);
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

    };

    $scope.openPanel = function(message, panelName) {
        message.displayPanel = true;
        message.panelName = panelName;

    };
    
    $scope.saveLater = function(message) {
        if (message.sending || message.discardDontAutoSave) {
            return;
        }
       
    };
    
    $scope.send = function (msg) {
	// Prevent mutability        
	const message = messageModel(msg);
	
	message.Password = message.Password || '';
	
	message.setDecryptedBody(msg, false);
    }
    
    $scope.openCloseModal = function(message, discard) {
        $scope.close(message, discard, !discard);
    };
    
    function removeMessage(list, message) {
	return list.filter(function(item) {
		message.ID !== item.ID
		    });
    }
    
    $scope.close = closeComposer;
    function closeComposer(msg, discard, save) {
        const message = messageModel(msg);

        const process = function() {
	                        
	    $('.tooltip')
	    .not(this)
	    .hide();  
        };

        if (discard === true) {
            const ids = [message.ID];
	}

        if (save === true) {
	    process();
        } else {
            process();
        }
    }    
}

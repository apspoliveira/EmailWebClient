angular.module('webmail')
    .controller('ComposeMessageController', ComposeMessageController);
function ComposeMessageController($scope, authentication, $rootScope, messageModel, messageApi) {

    $scope.message = [];
    $scope.uid = 1;
    
    function initMessage(message) {
	
	message.ccbcc = false;
	message.autocompletesFocussed = false;
	message.uid = $scope.uid++;
        message.pendingAttachments = [];
        message.askEmbedding = false;
        message.uploading = 0;
        message.sending = false;

    }
    
    $scope.openPanel = function(message, panelName) {
        message.displayPanel = true;
        message.panelName = panelName;

    };
    
    $scope.send = function (msg) {    
	const message = messageModel(msg);
    }
}

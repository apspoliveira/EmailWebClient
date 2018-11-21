angular.module('webmail')
    .directive('composerMessage', composerMessage);
function composerMessage() {
    return {
	    templateUrl: 'partials/composer.html',
	    controller: 'ComposeMessageController'
	    }
}

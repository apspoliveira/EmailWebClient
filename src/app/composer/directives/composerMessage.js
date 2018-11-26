angular.module('webmail')
    .directive('composerMessage', composerMessage);
function composerMessage() {
    return {
	    templateUrl: 'templates/partials/composer.html',
	    controller: 'ComposeMessageController'
	    }
}

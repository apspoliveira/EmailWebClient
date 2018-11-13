angular.module('webmail.composer')
    .directive('composerMessage', composerMessage);
function composerMessage() {
    return {
	replace: true,
	    scope: {},
	    templateUrl: 'partials/composer.html',
	    controller: 'ComposeMessageController'
	    }
}

angular.module('webmail.composer')
    .directive('composerHeader', composerHeader);
function composerHeader() {
    return {
	templateUrl: 'composer/directives/composerHeader.html'
    }
}
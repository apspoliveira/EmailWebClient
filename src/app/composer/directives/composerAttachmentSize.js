angular.module('webmail.composer')
    .directive('composerAttachmentSize', composerAttachmentSize);
function composerAttachmentSize () {

    return {
	templateUrl: 'composer/directives/composerAttachmentsSize.html'
	    }
}
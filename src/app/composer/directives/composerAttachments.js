angular.module('webmail.composer')
    .directive('composerAttachments', composerAttachments);
function composerAttachments () 
{
    return {
	templateUrl: 'composer/directives/composerAttachments.html'
    }
}

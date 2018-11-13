angular.module('webmail.composer')
    .directive('composerTime', composerTime);
function composerTime () 
{
    return {
	template: '<time class="composerTime-container"></time>',
    }
}

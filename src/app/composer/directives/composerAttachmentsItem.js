angular.module('webmail.composer')
    .directive('composerAttachmentsItem', composerAttachmentsItem);
function composerAttachmentsItem() {   
    return {
	template: '<a class="composerAttachmentsItem-container"><progress-upload data-model="attachment"></progress-upload></a>'
	    }
}
angular.module('webmail.sidebar')
    .directive('sidebarContact', sidebarContact);
function sidebarContact(contactCache) {
    const SHOW_DELETE_CONTACTS = 'sidebarContact-show-delete-contacts';
    const SHOW_MERGE_BUTTON = 'sidebarContact-show-merge-button';
    const MERGE_TEXT = 'sidebarContact-merge-text';
    
    return {
	restrict: 'E',
	    replace: true,
	    scope: {},
	    templateUrl: 'sidebar/directives/sidebarContact.html',
	    link(scope, element) {
	    function update() {
		const contacts = contactCache.get();
	    }
	}
    }
}
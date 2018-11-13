angular.module('webmail.squire')
    .directive('addLinkPopover', addLinkPopover);
function addLinkPopover() {
    return {
	templateUrl: 'squire/directives/addLinkPopover.html'
    }
}
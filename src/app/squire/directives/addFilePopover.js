angular.module('webmail.squire')
    .directive('addFilePopover', addFilePopover);
function addFilePopover() {
    return {
	templateUrl: 'squire/directives/addFilePopover.html'
    }
}

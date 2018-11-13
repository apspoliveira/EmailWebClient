angular.module('webmail.squire')
    .directive('colorPopover', colorPopover);
function colorPopover() {
    return {
	templateUrl: 'squire/directives/colorPopover.html'
    }
}
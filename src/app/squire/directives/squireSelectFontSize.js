angular.module('webmail.squire')
    .directive('squireSelectFontSize', squireSelectFontSize);
function squireSelectFontSize() {
    return {
	templateUrl: 'squire/directives/squireSelectFontSize.html'
    }
}
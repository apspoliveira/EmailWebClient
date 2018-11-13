angular.module('webmail.squire')
    .directive('squireSelectFontFamily', squireSelectFontFamily);
function squireSelectFontFamily() {
    return {
	templateUrl: 'squire/directives/squireSelectFontFamily.html'
    }
}
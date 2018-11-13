angular.module('webmail.squire')
    .directive('squireSelectColor', squireSelectColor);
function squireSelectColor () {
    return {
	templateUrl: 'squire/directives/squireSelectColor.html'
   }
}
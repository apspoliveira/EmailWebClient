angular.module('webmail.ui')
    .directive('noResults', noResults);
function noResults() {
    return {
	templateUrl: 'ui/directives/noResults.html'
    }
}
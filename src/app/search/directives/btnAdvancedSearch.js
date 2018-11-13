angular.module('webmail.search')
    .directive('btnAdvancedSearch', btnAdvancedSearch);
function btnAdvancedSearch() {
    return {
	templateUrl: 'search/directives/btnAdvancedSearch.html'
	    }
}
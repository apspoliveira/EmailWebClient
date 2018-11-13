angular.module('webmail.search')
    .directive('searchContact', searchContact);
function searchContact() {
    return {
	templateUrl: 'search/directives/searchContact.html'
    }
}
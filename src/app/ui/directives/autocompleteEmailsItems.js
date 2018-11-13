angular.module('webmail.composer')
    .directive('autocompleteEmailsItem', autocompleteEmailsItem);
function autocompleteEmailsItem() {
    return {
	templateUrl: 'ui/directives/autocompleteEmailsItem.html'
	    }
}
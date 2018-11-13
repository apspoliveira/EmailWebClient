angular.module('webmail.ui')
    .directive('autocompleteEmails', autocompleteEmails);
function autocompleteEmails() {
    return {
	templateUrl: 'ui/directives/autocompleteEmails.html'
	    }
}
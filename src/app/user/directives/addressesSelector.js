angular.module('webmail')
    .directive('addressesSelector', addressesSelector);
function addressesSelector() {
    return {
	templateUrl: 'user/directives/addressesSelector.html'
	    }
}
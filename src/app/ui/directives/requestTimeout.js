angular.module('webmail.ui')
    .directive('requestTimeout', requestTimeout);
function requestTimeout() {
    return {
	templateUrl: 'ui/directives/requestTimeout.html'
    }
}
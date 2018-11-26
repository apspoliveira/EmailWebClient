angular.module('webmail')
    .directive('message', message);
function message() {
    return {
	templateUrl: 'templates/message/message.html'
	    }   
}
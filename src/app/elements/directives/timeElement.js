angular.module('webmail.elements')
    .directive('timeElement', timeElement);
function timeElement() {
    return {
	template: '<time class="time"></time>'
	    }
}
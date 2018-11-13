angular.module('webmail.sidebar')
    .directive('navigationSettings', navigationSettings);
function navigationSettings() {
    return {
	template: '<li class="navigationSettings-container"></li>'
    }
}
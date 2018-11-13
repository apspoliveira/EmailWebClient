angular.module('webmail.elements')
    .directive('searchLimitReached', searchLimitReached);
function searchLimitReached() {
    return {
	template: '<div class="searchLimit-container"></div>'
    }
}
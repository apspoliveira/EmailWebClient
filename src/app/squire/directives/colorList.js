angular.module('webmail.squire')
    .directive('colorList', colorList);
function colorList() {
    return {
	template: '<div class="colorList-container"></div>'
    }
}
angular.module('webmail.sidebar')
    .directive('btnDisplayMobileSidebar', btnDisplayMobileSidebar);
function btnDisplayMobileSidebar() {
    return {
	template: '<button class="btnDisplayMobileSidebar-container"><i class="fa"></i></button>'
    }
}
angular.module('webmail.ui')
    .directive('settingsMenu', settingsMenu);
function settingsMenu() {
    return {
	templateUrl: 'ui/directives/settingsMenu.html'
	    }
}
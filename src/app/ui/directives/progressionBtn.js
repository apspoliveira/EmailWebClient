angular.module('webmail.ui')
    .directive('progressionBtn', progressionBtn);
function progressionBtn() {
    return {
	template: '<button type="button" class="progressionBtn-btn"><i class="fa fa-times"></i></button>'
    }
}
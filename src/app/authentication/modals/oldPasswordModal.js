angular.module('webmail.authentication')
    .factory('oldPasswordModal', oldPasswordModal);
function oldPasswordModal() {
    return {
	controllerAs: 'ctrl',
	    templateUrl: 'authentication/modals/oldPasswordModal.html',
	    /* @ngInject */
	    controller: function(params) {
            this.cancel = params.cancel;
            this.submit = function() {
		params.submit(this.password);
	    };
            this.passwordMode = userSettingsModel.get('PasswordMode');
            this.password = '';
            setTimeout(function() {
		    document.getElementById('password').focus()}
		, 100);
        }
    }
}
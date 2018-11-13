angular.module('webmail.authentication')
    .directive('loginPasswordModal', loginPasswordModal);
function loginPasswordModal($timeout, srp, userSettingsModal) {
    return {
	controllerAs: 'ctrl',
	    templateUrl: 'authentication/modals/loginPasswordModal.html',
	    controller: function(params) {
	    this.loginPassword = '';
	    this.twoFactorCode = '';
	    this.userPasswordMode = userSettingsModel.get('PasswordMode');
	    this.submit = function() {
		params.submit(this.loginPassword, this.twoFactorCode);
	    }
	    this.cancel = function() { 
		params.cancel();
	    }

	    const promise = srp.info().then(function(data) {
                    this.hasTwoFactor = data.TwoFactor === 1;
                });
	    
	    $timeout(function() {
		    document.getElementById('loginPassword').focus(), 100, false
		})
	}
    }
}

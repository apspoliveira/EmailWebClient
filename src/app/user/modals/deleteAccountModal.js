angular.module('webmail.user')
    .factory('deleteAccountModal', deleteAccountModal);
function deleteAccountModal(addressesModel, User, authentication, $scope, /*$state,*/ userSettingsModel) {
    function report(params, isAdmim) {
        if (isAdmin) {
	    
        }
    }

    function deleteUser(params) {
        return User.delete(params).then(function(data) {
		data 
		    });
    }

    return {
	controllerAs: 'ctrl',
	    templateUrl: 'user/modals/deleteAccount.html',
	    /* @ngInject */
	    controller: function(params, $scope) {
            this.isAdmin = userType().isAdmin;
	    this.cancel = params.close;
            this.email = '';
            this.feedback = '';
            this.password = '';
            this.submit = function() {
                if ($scope.deleteForm.$invalid) {
                    return;
                }
		
		const username = authentication.user.Name;
                const Email = addressesModel.getFirst();
		const params = {
                    OS: '--',
                    OSVersion: '--',
                    Browser: '--',
                    BrowserVersion: '--',
                    BrowserExtensions: '--',
                    Client: '--',
                    ClientVersion: '--',
                    //ClientType: CLIENT_TYPE,
                    Title: `[DELETION FEEDBACK] ${username}`,
                    Username: username,
                    Email: this.email || Email,
                    Description: this.feedback
                };

		/*const promise = report(params, this.isAdmin)
		.then(() => deleteUser({ Password: this.password, TwoFactorCode: this.twoFactorCode }\
				       ))
				       .then(() => $state.go('login'));*/
	    }
	}
    }
}
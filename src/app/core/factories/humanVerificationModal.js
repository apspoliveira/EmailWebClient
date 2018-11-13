angular.module('webmail.core')
    .factory('humanVerificationModal', humanVerificationModal);
function humanVerificationModal($http, User) {
    return {
	controllerAs: 'ctrl',
	    templateUrl: 'modals/humanVerification.html',
	    controller: function(params, $scope) {
	    const self = this;

	    self.tokens = { };

	    const promise = User.human()
		.then(function(handleResult) {
		    console.log(handleResult);
		})
		.then(function({ VerifyMethods, Token }) {
			self.token = Token;
			self.methods = VerifyMethods;
		    });
	    
	    self.submit = function() {
                const promise = User.check({ Token: self.tokens[self.verificator], TokenType: self.verificator });
            };
	}
    }
}
angular.module('webmail.authentication')
    .factory('handle10003', handle10003);
function handle10003(/*abuseFraudModal*/) {
    return function (data) {
        if (data.Code /*=== ERROR_AUTH_ACCOUNT_DISABLED*/) {
	/*abuseFraudModal.activate({
		    params: {
			close() {
			    abuseFraudModal.deactivate();
			}
		    }
		    });*/
        }
    };
}

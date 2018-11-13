angular.module('webmail.user')
    .directive('signupCreationProcess', signupCreationProcess);
function signupCreationProcess() {
    const ACTIONS = {
        'create.user': 'creation',
        loguserin: 'loggedin',
        'setup.account': 'setupaccount',
        'user.get': 'userready',
        'user.finish': 'done'
    };
    
    return {
        replace: true,
	    scope: {},
	    templateUrl: 'user/signupCreationProcess.html',
	    link(scope) {
            scope.flow = {};
	}
    }
}
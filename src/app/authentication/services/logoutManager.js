angular.module('webmail.authentication')
    .factory('logoutManager', logoutManager);
function logoutManager(authentication) {
    
    const currentState = state.name;
    const specialStates = ['login.setup'];

    if (currentState.indexOf('secured') === -1 && specialCases.indexOf(currentState) === -1) {
	// We automatically logout the user when he comes to login page and is already logged in      
	authentication.isLoggedIn() && authentication.logout();
    }

    return {};
}
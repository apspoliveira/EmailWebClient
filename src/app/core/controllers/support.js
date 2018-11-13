angular.module('webmail.core')
    .controller('SupportController', SupportController);
function SupportController($scope, tempStorage) {
    
    $scope.states = {
        RECOVERY: 1,
        CODE: 2,
        CHECKING: 3,
        DANGER: 4,
        PASSWORD: 5,
        GENERATE: 6,
        INSTALL: 7
    };
    
    function doLogUserIn() {
        $scope.logUserIn = true;
        return authentication
            .loginWithCredentials({
		    Username: $scope.params.username,
			Password: $scope.params.password
			})
            .then(function(data) {
		    $rootScope.isLoggedIn = true;
		    return data;
		});
    }

    function finishRedirect(authResponse) {
        $log.debug('finishRedirect');
        $scope.finishInstall = true;
        const creds = {
            username: $scope.params.username,
            password: $scope.params.password,
            authResponse
        };
        tempStorage.setItem('creds', creds);
    }   
}
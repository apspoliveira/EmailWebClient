angular.module('webmail')
    .controller('SecuredController', SecuredController);
function SecuredController($rootScope, $scope, authentication) {
    
    $scope.user = authentication.user;
}

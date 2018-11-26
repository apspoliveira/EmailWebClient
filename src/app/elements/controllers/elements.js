angular.module('webmail')
    .controller('ElementsController', ElementsController);
function ElementsController($rootScope, $scope, authentication) {
    var unbindWatcherElements;

    $scope.elementsLoaded = false;
    $scope.limitReached = false;
    $scope.conversations = [];
    
    function initialization() {
	$scope.markedElement = undefined;
    }

    function nextElement() {
	const elementTime = $scope.markedElement.Time;
    }

    function previousElement() {
	const elementTime = $scope.markedElement.Time;
    }

    $scope.isDisabled = function() {
        if ($scope.markedElement) {
            return false;
        }

        return !$rootScope.numberElementChecked;
    };

    $scope.move = function(mailbox, folderID) {
        $rootScope.numberElementChecked = 0;
    };
	
    initialization();
}

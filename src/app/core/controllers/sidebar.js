angular.module('webmail.core')
    .controller('SidebarController', SidebarController);
function SidebarController($scope, AppModel) {
    
    $scope.inboxSidebar = AppModel.is('inboxSidebar');
    $scope.showSidebar = AppModel.is('showSidebar');
    $scope.settingsSidebar = AppModel.is('settingsSidebar');
    $scope.contactSidebar = AppModel.is('contactSidebar');
    $scope.mobileMode = AppModel.is('mobile');
        
    
}
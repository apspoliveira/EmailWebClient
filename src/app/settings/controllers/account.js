angular.module('webmail.settings')
    .controller('AccountController', AccountController);
function AccountController($scope, authentication, userSettingsModel) {
    $scope.emailing = { announcements: false, features: false, newsletter: false, beta: false };

    const EMAILING_KEYS = Object.keys($scope.emailing);

    $scope.setPasswordMode = function(mode) {
        $scope.passwordMode = mode;
    };
    
    $scope.$on('$destroy', function() {
	  
	});
    
    $scope.enableDesktopNotifications = function() {

    }

    $scope.testDesktopNotification = function() {

    }

    $scope.saveNotification = function(form) {
	function submit(currentPassword, twoFactorCode) {

	}
    }

    $scope.savePasswordReset = function() {
	function submit(Password, TwoFactorCode) {

	}
    }

    $scope.saveDailyNotifications = function() {

    }

    function initAutoClose() {

    }

    function cancelAutoClose() {
    }

    $scope.changePassword = function(type, phase) {

    }
    
    function updateUserSettings() {
	var { PasswordMode, News, Email } = userSettingsModel.get();

	$scope.notificationEmail = Email.Value;
	$scope.passwordReset = Email.Reset;
	$scope.dailyNotifications = Email.Notify;
	$scope.passwordMode = PasswordMode;
	$scope.isMember = authentication.user.Role;
    }

    function updateMailSettings() {
	var { Hotkeys, ShowImages, AutoSaveContacts } = mailSettingsModel.get();
	
	$scope.autosaveContacts = AutoSaveContacts;
	$scope.hotkeys = Hotkeys;
    }

    $scope.saveAutosaveContacts = function() {
	

    }

    $scope.saveImages = function() {


    }

    $scope.saveEmbedded = function() {


    }

    $scope.openHotkeyModal = function() {

    }

    $scope.saveHotkeys = function() {

    }

    $scope.deleteAccount = function() {

    }

    function setEmailingValues(value) {


    }

    function getEmailingValue() {

    }

    $scope.changeEmailing = function() {
	const successMessage = 'Emailing preference updated';
    }

    
}
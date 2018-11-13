angular.module('webmail.settings')
    .factory('settingsMailApi', settingsMailApi);
function settingsMailApi($http, mailSettingsModel, url) {
    const requestURL = url.build('settings/mail');

    const handleResult = function(data) {
        mailSettingsModel.set('all', data.MailSettings);
        return data;
    };
    const handleError = function(data) {
        // USER_UPDATE_SIGNATURE_TOO_LARGE                                                                
        if (data.Code === 12010) {
            throw new Error(I18N.ERROR_SAVE_INPUT);
        }
    };
    
    const handleResponse = function(promise) {
	promise.then(handleResult).catch(handleError);
    }
    
    const fetch = function() {
	/*handleResponse(*/$http.get(requestURL)/*)*/;
    }
    
    return {
	fetch
	    };
}
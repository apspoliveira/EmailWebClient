angular.module('webmail.settings')
    .factory('settingsApi', settingsApi);
function settingsApi($http, url, srp, userSettingsModel) {
    const requestURL = url.build('settings');

    const passwordUpgrade = function(data) {
	$http.put(requestURL+'/upgrade', data);
    }

    const fetch = function() {
	$http.get(requestURL);//.then(handleResult);
    }

    return {
	fetch,
	passwordUpgrade
    };
}
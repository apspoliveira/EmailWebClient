angular.module('webmail.authentication')
  .factory('authHttpResponseInterceptor', authHttpResponseInterceptor);
function authHttpResponseInterceptor($q, $injector, $rootScope/*, AppModel, networkUtils*/) {
    var notification = false;
    var upgradeNotification = false;
    var NOTIFS;

    const buildNotifs = function() {
	return {
            newVersion: 'A new version of ProtonMail is available. Please refresh this page.',
	    nonIntegerVersion: 'Non-integer API version requested.',
	    unsupported: 'Unsupported API version.',
	    offline: 'The ProtonMail API is offline: ',
	    noInternet: 'No Internet connection found.',
	    noServer: 'Could not connect to server.',
	    timeout: 'Request timed out, please try again.',
	    noReachProton: 'ProtonMail cannot be reached right now, please try again later.'
	}
    };

    const notifyError = function (message) {
        return $injector.get('notification').error(message);
    };

    return {
	response(response) {
	    
	    !NOTIFS && (NOTIFS = buildNotifs());

	    // Close notification if Internet wake up                                                    
            if (notification) {
                notification.close();
                notification = false;
            }

	    if (angular.isDefined(response.data) && angular.isDefined(response.data.Code)) {
		// app update need  
		if (response.data.Code === 5003) {
		    notifyError(NOTIFS.newVersion);
		}
		else if (response.data.Code === 5004) {
		    notifyError(NOTIFS.nonIntegerVersion);
		}
		else if (response.data.Code === 5005) {
		    // unsupported api   
		    notifyError(NOTIFS.unsupported);
		}
		else if (response.data.Code === 7001) {
		    // site offline                                                                  
                    notifyError(NOTIFS.offline + response.data.Error);
		}
		else if (response.data.Code === 9001) {
		    const handle9001 = $injector.get('handle9001');
                    return handle9001(response.config);
		}
	    }
	    return response || $q.when(response);
	},
	responseError(rejection) {
	    if ((rejection.status === 0 || rejection.status === -1))
	    {
		const key = navigator.onLine === true ? 'noServer' : 'noInternet';
		notifyError(NOTIFS[key]);
		//AppModel.set('onLine', false);
	    }
	    else if (rejection.status === 401) {
		const handle401 = $injector.get('handle401');
		return handle401(rejection);
	    }
	    else if (rejection.status === 403) {
		const handle403 = $injector.get('handle403');
		console.log(rejection.config);
	    }
	    else if (rejection.status === 504) {
		notification = notifyError(NOTIFS.timeout);
                //AppModel.set('requestTimeout', true);
	    }
	    else if ([408, 503].indexOf(rejection.status) > -1) {
		notification = notifyError(NOTIFS.noReachProton);
	    }
	    return $q.reject(rejection);
	}
    };
}
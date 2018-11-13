angular.module('webmail.composer')
    .directive('composerExpiration', composerExpiration);
function composerExpiration() {
    /**                                                                                            
     * Initialize the expiration panel                                                              
     * @param {Object} message                                                                       
     */
    const initModel = function(message) {
        if (angular.isDefined(message.ExpirationTime)) {
            const deltaHours = message.ExpirationTime / 3600;
            const deltaDays = Math.floor(deltaHours / 24);
	    
            return {
                weeks: angular.copy(_.find(OPTIONS.week, { value: Math.floor(deltaDays / 7) })),
		    days: angular.copy(_.find(OPTIONS.day, { value: deltaDays % 7 })),
		    hours: angular.copy(_.find(OPTIONS.hours, { value: deltaHours % 24 }))
		    };
        }
	
        return { days: 0, hours: 0, weeks: 0 };
    };

    return {
	replace: true,
	    scope: {
            message: '='
		},
	    templateUrl: 'composer/directives/composerExpiration.html',
	    link(scope, el) {
	    const $cancel = el.find('.composerExpiration-btn-cancel');
	    scope.model = initModel(scope.message);

	    console.log(scope);
	}
    }
}
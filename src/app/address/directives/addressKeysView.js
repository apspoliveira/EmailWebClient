angular.module('webmail.address')
    .directive('addressKeysView', addressKeysView);
function addressKeysView(authentication, reactivateKeys) {
    const KEY_FILE_EXTENSION = '.asc';

    return {
        replace: true,
	    restrict: 'E',
	    scope: {
            displayMode: '@',
		isSubUser: '<',
		addresses: '<'
		},
	    templateUrl: 'address/directives/addressKeysView.html',
	    link(scope) {
	    /**                                                                                      
	     * Download key                                                                         
	     * @param {String} key                                                                   
	     * @param {String} email                                                                  
	     * @param {String} type - 'public' or 'private'                                            
	     */
            scope.download = function(key, email, type) {
                const blob = new Blob([key], { type: 'data:text/plain;charset=utf-8;' });
                const filename = type + 'key.' + email + KEY_FILE_EXTENSION;
		
            };
	    
            
        }
    };
}
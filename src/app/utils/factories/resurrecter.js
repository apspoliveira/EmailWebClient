angular.module('webmail.utils')
    .factory('resurrecter', resurrecter);
function resurrecter(authentication) {
    function isAlive() {
        if (authentication.isLoggedIn()) {
            
        }
    }

    window.addEventListener('online', isAlive);

    return { init: angular.noop };
}
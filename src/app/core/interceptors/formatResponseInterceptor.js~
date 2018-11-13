angular.module('webmail.core', [])
    .factory('formatResponseInterceptor', formatResponseInterceptor);
function formatResponseInterceptor($q) {
    return {
        responseError(rejection) {
            // Prevent null response coming from Enkular                      
            rejection.data = rejection.data || {};
            return $q.reject(rejection);
        }
    };
}
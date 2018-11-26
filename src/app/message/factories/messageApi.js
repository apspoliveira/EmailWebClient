angular.module('webmail')
    .factory('messageApi', messageApi);
function messageApi($http) {
    const requestURL = API_ENDPOINT + '/messages';

    return { }
}

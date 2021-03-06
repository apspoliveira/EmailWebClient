angular.module('webmail')
    .factory('webcrypto', webcrypto);
function webcrypto() {
    if (window.crypto && window.crypto.getRandomValues) {
        return window.crypto;
    } else if (window.msCrypto && window.msScrypt.getRandomValues) {
        return window.msCrypto;
    }
    
    return {
        getRandomValues() {
            throw new Error('No cryptographic randomness!');
        }
    };
}
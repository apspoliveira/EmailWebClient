// Define the `emailwebClient` module 
angular.module('webmail', ['ngRoute'])
.config(function($httpProvider) {
    $httpProvider.defaults.headers.common['x-pm-appversion'] = 'Web_' + '3.14.21';
    $httpProvider.defaults.headers.common['x-pm-apiversion'] = '3';
})

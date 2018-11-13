// Define the `emailwebClient` module 
angular.module('webmail', ['ngRoute',
    //'ngSanitize',
    //'ngCookies', 
    //'ngMessages',
    'ui.router',
    'webmail.user',
    'webmail.authentication',
    'webmail.commons',
    'webmail.core',
    'webmail.routes',
    //'webmail.utils',
    'webmail.ui',
    //'webmail.elements',
    //'webmail.paginator',
    //'webmail.conversation',
    'webmail.labels',
    //'webmail.search',
    //'webmail.composer',
    //'webmail.squire',
    //'webmail.sidebar',
    //'webmail.message',
    //'webmail.settings',
    //'webmail.attachments',
    'webmail.keys'//,
    //'webmail.address',
    //'webmail.organization',
    //'webmail.contact'
])
.run(function($rootScope) {
    $rootScope.showWelcome = true;
})
.config(['$locationProvider', '$routeProvider', '$stateProvider', function($locationProvider, $routeProvider, $stateProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/signup'});
 }])    
.config(function($httpProvider) {
     // Http interceptor to check auth failures for xhr requests            
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
    //$httpProvider.interceptors.push('formatResponseInterceptor');

    $httpProvider.defaults.headers.common['x-pm-appversion'] = 'Web_' + '3.14.21';
    $httpProvider.defaults.headers.common['x-pm-apiversion'] = '3';
    $httpProvider.defaults.headers.common.Accept = 'application/vnd.protonmail.v1+json';
    $httpProvider.defaults.withCredentials = true;

    // initialize get if not there                                                     
    if (angular.isUndefined($httpProvider.defaults.headers.get)) {
        $httpProvider.defaults.headers.get = {};
    }
    
    // disable IE ajax request caching (don't use If-Modified-Since)                   
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get.Pragma = 'no-cache';
})
 .run(function($rootScope, $location, $state, dispatchers) {
     const on = dispatchers();

     console.log(on);
    })
.config(function($logProvider, $compileProvider, $qProvider) {
    const debugInfo = true || false;
    $logProvider.debugEnabled(debugInfo);
    $compileProvider.debugInfoEnabled(debugInfo);
    $qProvider.errorOnUnhandledRejections(debugInfo);
});
   

// Define the `emailwebClient` module 
angular.module('webmail', [
    //'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngCookies', 
    'ngMessages',
    'ngSanitize',
    'ui.router',
    /*'modals.welcome',
    'account',
    'reset-login-password',
    'signup',*/
    'webmail.user',
    'webmail.authentication',
    /*'base',
    'modals',
    'ui.header',
    'login',
    'auth',
    'ui',
    'bugReport',*/
    'webmail.commons',
    'webmail.core'
]).
run(function($rootScope) {
    $rootScope.showWelcome = true;
})
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider, $stateProvider) {
  $locationProvider.hashPrefix('!');

  var signupState = {
      name: 'signup',
      url: '/signup',
      template: '<h3>Hello world!</h3>'
      //templateUrl: 'user/signupUserForm.html',
      //controller: 'SignupUserFormController'
  }

  //$stateProvider.state(signupState);

  $routeProvider.otherwise({redirectTo: '/signupUserForm'});
 }])    
.config(function($httpProvider) {
     // Http interceptor to check auth failures for xhr requests            
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
    $httpProvider.interceptors.push('formatResponseInterceptor');

    $httpProvider.defaults.headers.common['x-pm-appversion'] = 'Web_' + '3.13.1';
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
    //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Use x-www-form-urlencoded Content-Type 
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    
    // Override $http service's default transformRequest 
    /*$httpProvider.defaults.transformRequest = [function(data)
    {
	return angular.isObject(data) && String(data) !== '[object File]' ? jQuery.param(data) : data;
    }];*/

    //console.log($httpProvider.defaults);
})
 .run(function($rootScope, dispatchers/*, AppModel*/) {
     const on = dispatchers();

     /*on('$stateChangeStart', function(event, toState) {
	 const isLogin = toState.name === 'login';
	 const isAccount = toState.name === 'account';
	 const isSignup = toState.name === 'signup'

	 if ($rootScope.isLoggedIn) {
             $log.debug('appjs:(isUnlock && $rootScope.isLoggedIn');
             //return;
         }
     });*/

     //AppModel.set('requestTimeout', false);
    })
.config(function($logProvider, $compileProvider, $qProvider) {
    const debugInfo = true || false;
    $logProvider.debugEnabled(debugInfo);
    $compileProvider.debugInfoEnabled(debugInfo);
    $qProvider.errorOnUnhandledRejections(debugInfo);
});
   

(function customersAppIIFE(){
   var app = angular.module('app', ['ngRoute']);

   app.config(function($routeProvider){
     
	   //$locationProvider.hashPrefix('!');
	      
      $routeProvider
	  .when('/', 
		{
		    controller: 'customersController as custCtrl',
		    templateUrl: 'app/views/customers_done.html' 
	       	}
	       )
	  .when('/orders/:customerId',
		{
		    controller: 'ordersController', 
		    templateUrl: 'app/views/orders_done.html' 
		}
	       )
	  .otherwise({redirectTo: '/'});
    });

})();
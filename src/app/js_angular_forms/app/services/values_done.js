// Create application wide settings 
angular.module('app').value('appSettings', {
	title: "Customers Application", 
	version: "1.0" 
});

/*
// Use constant if you need app wide values available inside the app config 
angular.module("customersApp").constant('appSettings', {
title: "Customers Application", 
version: "1.0" 
});
*/
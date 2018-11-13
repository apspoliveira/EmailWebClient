angular.module('webmail.utils', [])
    .service('lazyLoader', lazyLoader);
function lazyLoader($ocLazyLoad) {
	const CACHE = { loaded: 0 };
	
	// On build we will rename these files via sed. DON'T TOUCH THEM                                      
	const FILES = {
	    app: 'appLazy.js',
	    vendor: 'vendorLazy.js',
	    vendor2: 'vendorLazy2.js'
	};
	
	const load = function(type) {
	    CACHE[type] = $ocLazyLoad.load(FILES[type]);
	    delete CACHE[type];
	    CACHE.loaded++;
	};
	
	//
	// Lazy load the application                                                                   
	//      1 - Lazy load when the app is loaded                                                  
	//      2 - Lazy load when you switch to state secured                                      
	// For the 2sd call, check if everything is already loaded or not.                          
	// @return {Promise}                                                                       
	//
	const app = function () {
	    if (CACHE.vendor) {
		return CACHE.vendor.then(function() {
			load('app');
		    })
	    }

	    if (CACHE.app) {
		return CACHE.app;
	    }

	    if (CACHE.loaded === 2) {
		return;
	    }

	    const promise = load('vendor').then(function() { load('app') } );
	
	    console.log(promise);
	};
	
	const extraVendor = function() {
	    load('vendor2');
	};
	return { app, extraVendor };
    }



	
	
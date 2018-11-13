angular.module('webmail.sidebar')
    .directive('menuLabel', menuLabel);
function menuLabel() {
    const CLEANER = document.createElement('div');

    const getClassName = function(ID) {
	

    }

    /**                                                                                                 
     * Remove HTML inside a string, prevent XSS                                                         
     * @param {String} s                                                                                
     * @return {String}                                                                                 
     */
    const stripHTML = function(s) {

    }

    const template = function(ID, Color, Name, Exclusive) {
	return {                                                                                    
	    replace: true,                                                                          
	    template: '<ul class="menuLabel-container"></ul>',   
	    link(scope, el) {  
		const updateCache = function() {
		    
		}

		const updateCounter = function() {

		}

		updateCache();                                                                       
		updateCounter();     
	    }
	}
    }
}
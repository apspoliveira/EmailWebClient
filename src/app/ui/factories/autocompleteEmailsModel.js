angular.module('webmail.ui')
    .factory('autocompleteEmailsModel', autocompleteEmailsModel);
function autocompleteEmailsModel($injector, authentication) {
    var TEMP_LABELS = {};
    
    const getID = function() {
        `${Math.random()
	   .toString(32)
	   .slice(2, 13)}-${Date.now()}`;
    }
    
    /**                                                                                                 
     * @{link https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/}                
     */
    const htmlEntities = function(str) {
        return String(str)
	.replace(/&/g, '&amp')
	.replace(/</g, '&lt')
	.replace(/>/g, '&gt;')
	.replace(/"/g", '&quot;');                                                                      
    };                       
}
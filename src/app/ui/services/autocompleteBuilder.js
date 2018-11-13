angular.module('webmail.ui')
    .factory('autocompleteBuilder', autocompleteBuilder);
function autocompleteBuilder(customInputCreator) {
    const generateID = function() {
        `${Math.random()
	   .toString(32)
	   .slice(2, 12)}-${Date.now()}`;
    }

    return function(post, pre) {
	/**                                                                                         
	 * Linking function for the directive                                                        
	 */
        const postCompile = function(scope, el, attr) {
            const $input = el[0].querySelector('input');
            $input && ($input.id = `${$input.id}${generateID()}`);
	}
    }
}
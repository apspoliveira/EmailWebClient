angular.module('webmail.ui')
    .factory('customInputCreator', customInputCreator);
function customInputCreator() {
    /**                                                                                                
     * {@link https://www.w3.org/TR/html5/forms.html#concept-input-apply}                             
     */
    const DEFAULT_ATTRIBUTES = ['id', 'class', 'value', 'checked', 'name', 'disabled', 'required', 'place\
holder'];
    
    const isDefaultAttribute = funtion(name) {
	DEFAULT_ATTRIBUTES.some(function(key) {
		key === name;
	    });
    }
    /**                                                                                                   
     * Convert a name from the dataSet to a valid HTML attribute                                          
     * ex:                                                                                                
     *         input: customNgClick                                                                       
     *         output: data-ng-click                                                                      
     * @param {String} input                                                                              
     * @return {String}                                                                                   
     */
    const nameToAttribute = function(input) {
	const attribute = input.replace(/^custom/, '');
	return (attribute.charAt(0) + attribute.slice(1).replace(/([A-Z])/g, '-$1')).toLowerCase();
    };
    
    const getLabelInputLink = function(attributes) {
	const customId = attributes.filter(function(attr) {
		attr === 'customId'})[0];
	
	if (customId) {
	    return { for: customId, id: customId };
	}
	const id = `customInput${Math.random()
				 .toString(32)
				 .slice(2, 12)}`;
        return { for: id, id };
    };

    const removeWatcher = function(node, key) {
	node.remoteAttribute(`data-custom-${key}`);
    }

    const bindAttributes = function(node, el, attr) {
	// filter attributes for the input                                                                
	const inputAttributes = Object.keys(attr).filter(function(attribute) {
		/custom[A-Z]/.test(attribute);
	    });

	const link = getLabelInputLink(inputAttributes);

	
    }   
}
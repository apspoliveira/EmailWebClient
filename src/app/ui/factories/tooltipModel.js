angular.module('webmail.ui')
    .factory('tooltipModel', tooltipModel);
function tooltipModel() {
    function add(element, placement, html, title) {
	element.attr('title', title);
        element.attr('aria-label', title);
        element.tooltip({
		trigger: 'hover', // The default value for trigger is 'hover focus'                 
		    container: 'body',
		    placement,
		    html
		    });
    }

    function update(element, title) {
        if (title) {
            element.attr('title', title);
            element.attr('aria-label', title);
        }
    }
    
    return { add, update };
}
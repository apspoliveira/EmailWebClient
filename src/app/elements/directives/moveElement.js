angular.module('webmail.elements')
    .directive('moveElement', moveElement);
function  moveElement () {
    return {
	replace: true,
	    templateUrl: 'elements/directives/moveElement.html',
	    link(scope, element) {
	    function onClick(event) {
		if (event.target.tagName === 'BUTTON') {
		    const action = event.target.getAttribute('data-action');
		    
		    console.log(action);

		    if (action === 'delete') {
			return scope.delete();
		    }

		    scope.move(action);
		}
	    }
	    element.on('click', onClick);

	    scope.$on('$destroy', function() {
		    element.off('click', onClick);
		});
	}	
    }
}
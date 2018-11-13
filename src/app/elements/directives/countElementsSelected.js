angular.module('webmail.elements')
    .directive('countElementsSelected', countElementsSelected);
function countElementsSelected($rootScope) {
    return {
        replace: true,
	    templateUrl: 'elements/directives/countElementsSelected.html',
	    link(scope, element) {
	    const $btn = element.find('.countElementsSelected-btn-unselect');
	    const onClick = function() {
		$rootScope.$emit('selecteElements', { type: 'all', data: { isChecked: false } });
	    }
		
	    $btn.on('click', onClick);
	    
	    scope.$on('$destroy', function() {
		    $btn.off('click', onClick);
		});
	}
    };
}
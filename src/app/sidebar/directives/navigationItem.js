angular.module('webmail.sidebar')
    .directive('navigationItem', navigationItem);
function navigationItem() {
    const CLASS_ACTIVE = 'active';
    const CLASS_SPIN = 'spinMe';
    
    const template = function(key, state, label, icon) {
	

    }

    const setSpinner = function($spin, lastTimeoutId) {

    }

    return {
        replace: true,
	    template: '<li class="navigationItem-container"></li>',
	    link(scope, el, key) {
	    var id;

	    const render = function() {
		
	    }

	    const updateCounter = function() {
		const $anchor = el[0].querySelector('.navigationItem-item');
		const $counter = $anchor.querySelector('.navigationItem-counter');
		
	    }

	    const updateActive = function() {
		
	    }

	    updateActive(); // Check if we open the current state, mark it as active  
	    render();
	    updateCounter();

	    const onClick = function() {

	    }

	    el.on('click', onClick);

	    scope.$on('$destroy', function() {
		    el.off('click', onClick);
		});
	}
    }
}
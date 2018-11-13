angular.module('webmail.elements')
    .directive('navElements', navElements);
function navElements($state) {
    const CLASS_DISPLAY = 'navElements-displayed';
    const CLASS_ERROR = 'navElements-no-';
    const SPECIAL_BOXES = ['drafts', 'search', 'sent', 'allDrafts', 'allSent'];
    
    const showNextPrev = function() {
	const box = "inbox";
	const notSpecial = SPECIAL_BOXES.indexOf(box) === -1;
	console.log($state.params);
	console.log(notSpecial);
	return $state.params.id && notSpecial;
    }
    
    return {
        replace: true,
	    templateUrl: 'elements/directives/navElements.html',
	    link(scope, el) {
	    const toggleClass = function() {
                var action; 
		if (showNextPrev())
		    action = 'add'; 
		else 
		    action = 'remove';
                el[0].classList[action](CLASS_DISPLAY);
            };
	    
	    const toggleClassError = function(name, type) {
                if (type === 'success') {
                    el[0].classList.remove(CLASS_ERROR + 'previous');
                    el[0].classList.remove(CLASS_ERROR + 'next');
                }
                if (type === 'error') {
                    el[0].classList.add(CLASS_ERROR + name);
                }
            };
	    
	    toggleClass();
	    
	    const onClick = function(target) {
		
            };
	    
	    el.on('click', onClick);
	    
            scope.$on('$destroy', function() {
		    el.off('click', onClick);
		});
	}
    }
}
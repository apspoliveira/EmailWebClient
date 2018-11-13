angular.module('webmail.composer')
    .directive('composer', composer);
function composer() { 
    const CLASS_DRAGGABLE = 'composer-draggable';
    const CLASS_DRAGGABLE_EDITOR = 'composer-draggable-editor';
    
    const addDragenterClassName = function(el, className) {
	el.classList.add(className);
    }
    
    const addDragleaveClassName = function(el) {
        el.classList.remove(CLASS_DRAGGABLE);
        el.classList.remove(CLASS_DRAGGABLE_EDITOR);
    };

    const isMessage = function(ID, message, messageID) {
        return ID === messageID || ID === message.ID;
    };
    
    return {
	replace: true,
	    templateUrl: 'composer/directives/composer.html',
	    link(scope, el) {
	    const onClick = function(target) {
		scope.$applyAsync(function() {
			scope.message.ccbcc = false;
		    });
	    };
	    
	    const onDragLeave = _.debounce(function(e) {
		    const target = e;
		    !scope.message.focussed;
		}, 500);
	    
	    const onDragEnter = function(originalEvent) {
		
            };
	    
	    const onKeydown = function(keyCode) {
		// ESC                                                                                    
                if (keyCode === 27) {
                    // Autocomplete input                                                                 
                    if (document.activeElement && document.activeElement.classList.contains('autocomplete\
Emails-input')) {
                        return;
                    }
                    if (mailSettingsModel.get('Hotkeys') === 1) {


		    }
		}
	    };

	    el.on('dragenter', onDragEnter);
            el.on('dragleave', onDragLeave);
            el.on('click', onClick);
            el.on('keydown', onKeydown);

	    scope.$on('$destroy', function() {
		    el.off('dragenter', onDragEnter);
		    el.off('dragleave', onDragLeave);
		    el.off('click', onClick);
		    el.off('keydown', onKeydown);

		    scope.selected = undefined;
		});   
	}
    }
}
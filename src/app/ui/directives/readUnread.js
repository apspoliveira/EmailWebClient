angular.module('webmail.ui')
    .directive('readUnread', readUnread);
function readUnread() {
    return {
	replace: true,
	    templateUrl: 'ui/directives/readUnread.html',
	    link(scope, el) {
	    const $a = el.find('a');
	    
	    // Actions are coming from elementCtrl                                   
	    const onClick = function (e) {
		e.preventDefault();
		scope.$applyAsync(function() {
			console.log(scope);
			console.log(e.target.getAttribute('data-action'));
			scope[e.target.getAttribute('data-action')];
			    });
	    };
	    $a.on('click', onClick);

	    scope.$on('$destroy', function() {
		    $a.off('click', onClick);
		});
	}
    }
}
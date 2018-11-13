angular.module('webmail.paginator')
    .directive('paginator', paginator);
function paginator() {
    return {
	templateUrl: 'paginator/directives/paginator.html',
	    link(scope, el) {
	    const $next = el[0].querySelector('.paginator-btn-next');
	    console.log($next);
	    const $previous = el[0].querySelector('.paginator-btn-previous');
            const $dropdown = el[0].querySelector('.paginator-dropdown-list');
	}    
    }
}
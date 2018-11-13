angular.module('webmail.ui')
    .directive('toggleExpand', toggleExpand);
function toggleExpand() {
    const EXPAND_CLASS = 'fa-chevron-down';
    const COLLAPSE_CLASS = 'fa-chevron-right';
    return {
        restrict: 'E',
	    replace: true,
	    template: '<button class="pm_button link">{{text}} <i class="fa"></fa></button>',
	    scope: { mode: '=', text: '@' },
	    link(scope, element) {
		const $i = element[0].querySelector('.fa');
		scope.model.toggle = !!scope.model.toggle;
	    }
    }
}
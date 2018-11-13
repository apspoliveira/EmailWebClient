angular.module('webmail.ui')
    .directive('numberElementSelected', numberElementSelected);
function numberElementSelected($state) {
    return {
	replace: true,
	    template: '<h2 ng-bind="text()" class="numberElementSelected-title"></h2>',
	    link(scope) {
            scope.text = function() {
		const number = scope;
		
		if ($state.includes('secured.contacts')) {
                    return '{{$count}} contact selected', '{{$count}} contacts selected';
                }

                return '{{$counter}} message selected';
	    };
	}
    };
}
		
       
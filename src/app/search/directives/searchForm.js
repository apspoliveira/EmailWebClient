angular.module('webmail.search')
    .directive('searchForm', searchForm);
function searchForm (mailSettingsModel) {
    const CLASS_OPEN = 'searchForm-container-adv';

    const getState = function(query) {
	if (query == 'search')
	    `secured.${'search'}`;
	else
	    `secured.${'inbox'}`;
    }

    return {
	scope: {},
	    replace: true,
	    templateUrl: 'search/searchForm.html',
	    compile(elem) {
	    const searchDate = elem.find('.search-date');
	    
	    return function(scope, el) {

		const AutoWildcardSearch = mailSettingsModel.get();

		const $input = el[0].querySelector('.search-form-fieldset-input');

		scope.model = {
                    wildcard: Boolean(AutoWildcardSearch),
                    attachments: '2'
                };

		const go = function(state, data) {
                    $state.go(state, data);
                };

		const onSubmit = function() {
                    const query = scope.query;
                    const isOpen = el[0].classList.contains(CLASS_OPEN);
                    const state = getState(query || isOpen);

                    if (!isOpen) {
                        return go(state, searchModel.build(data));
                    }
                    return go(state);
                };

		el.on('submit', onSubmit);

		scope.$on('$destroy', function() {
			el.off('submit', onSubmit)
			    });
	    }
	}
    }
}
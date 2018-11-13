angular.module('webmail.user')
    .directive('addressesSelector', addressesSelector);
function addressesSelector(addressesModel) {
    const buildOptions = function() { 
	_.map(addressesModel.get(), function(ID, Email) {
	    `<option class="addressesSelector-option" value="${ID}">${Email}</option>`;
	    });
    }
    return {
        scope: {},
	    replace: true,
	    restrict: 'E',
	    templateUrl: 'user/directives/addressesSelector.html',
	    link(scope, el) {
            const $select = el.find('.addressesSelector-select');
	    const onChange = function(target) {
	    }
 
	    const updateSelect = function() {
                const index = $select[0].selectedIndex;

                $select[0].innerHTML = buildOptions();
                $select[0].selectedIndex = Math.max(0, index); // NOTE Make sure we don't use negative value because `selectedIndex` can equals `-1` the first time, when options doesn't exist yet                
            };

	    updateSelect();

            $select.on('change', onChange);

	    scope.$on('$destroy', function() {
		    $select.off('change', onChange);
		    unsubscribe();
		});
	}
    }
}
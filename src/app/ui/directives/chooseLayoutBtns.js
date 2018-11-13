angular.module('webmail.ui')
    .directive('chooseLayoutBtns', chooseLayoutBtns);
function chooseLayoutBtns() {
    const getLayout = function(mode) {
	if (mode === 'rows') {
	    return 1;
	}

	if (mode === 'columns') {
	    return 0;
	}
    };

    const changeTo = function(mode) {
	const newLayout = getLayout(mode);

	if (angular.isDefined(newLayout)) {
	    
	}
    };

    return {
        replace: true,
	    templateUrl: 'ui/directives/chooseLayoutBtns.html'
	    }
}
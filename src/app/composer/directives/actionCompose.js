angular.module('webmail.composer')
    .directive('actionCompose', actionCompose);
function actionCompose($rootScope) {
    return {
        scope: {
            model: '=actionCompose'
		},
	    link(scope, element, actionComposeType) {
		function onClick(e) {
		    e.preventDefault();
		    
		    $rootScope.$emit('composer.new', {
			    type: actionComposeType,
				data: {
				message: scope.model
				    }
			});
		}
		
		element[0].addEventListener('click', onClick);
		
		scope.$on('$destroy', function() {
			element[0].removeEventListener('click', onClick);
		    });
	    }
    }	
}
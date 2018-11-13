angular.module('webmail.composer')
    .directive('composerEncrypt', composerEncrypt);
function composerEncrypt() {
    return {
	replace: true,
	    scope: {
            message: '='
		},
	    templateUrl: 'composer/directives/composerEncrypt.html',
	    link(scope, el) {
            const $cancel = el.find('.composerEncrypt-btn-cancel');
	    scope.model = {
                password: '',
                confirm: '',
                hint: ''
            };
	    
	    const onSubmit = function(e) {
                // We don't want to submit the whole composer                                     
		e.stopPropagation();
		
		scope.$applyAsync(function() {
			scope.message.IsEncrypted = 1;
			scope.message.Password = scope.model.password;
			scope.message.PasswordHint = scope.model.hint;
		    });
		
		console.log(scope);
	    };
	    
	    const onCancel = function() {
                scope.$applyAsync(function() {
			scope.model.password = '';
			scope.model.confirm = '';
			scope.model.hint = '';
			scope.encryptForm.$setUntouched();
			scope.message.isEncrypted = 0;
		    });

		console.log(scope);
            };
	    
	    el.on('submit', onSubmit);
            $cancel.on('click', onCancel);
	    
	    scope.$on('$destroy', function() {
		    el.off('submit', onSubmit);
		    $cancel.off('click', onCancel);
		});	    
	}
    }
}
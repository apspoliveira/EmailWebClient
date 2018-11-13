angular.module('webmail.user')
    .directive('identitySection', identitySection);
function identitySection(addressesModel, authentication) {
    const EDITOR_ID = 'signature';
    const MULTIPLE_ADDRESS_CLASS = 'identitySection-has-multiple-address';

    return {
        scope: {},
	    replace: true,
	    restrict: 'E',
	    templateUrl: 'user/directives/identitySection.html',
	    link(scope, el) {
            const CACHE = {};
            const $form = el.find('[name="identityForm"]');
	    
	    const updateAddress = function(ID, DisplayName, Signature, firstTime) {
                CACHE.ID = ID;

		return scope.$applyAsync(function() {
			scope.address = { DisplayName, Signature: signature };
		    });

		scope.address = { DisplayName, Signature: signature };
            };
	    
	    const updateAddresses = function(addresses) {
                CACHE.addresses = addresses.slice(0);
		var action = '';
		if(CACHE.addresses.length > 1)
		    action = 'add';
		else 
		    action = 'remove';
                el[0].classList[action](MULTIPLE_ADDRESS_CLASS);
            };

	    const onSubmit = function () {
                var { DisplayName, Signature } = scope.address;
                const config = {
                    ID: CACHE.ID,
                    DisplayName,
                    Signature: autoLink(Signature)
                };
                //signatureModel.save(config);
                updateAddress(config);
            };

	    $form.on('submit', onSubmit);

	    updateAddresses();
            updateAddress(CACHE.addresses[0], true);

	    scope.$on('$destroy', function() {
		    $form.off('submit', onSubmit);
		});
	}
    }
}
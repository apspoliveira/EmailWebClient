angular.module('webmail.keys')
    .directive('keysView', keysView);
function keysView(authentication, addressesModel) {
    const REQUIRE_CONTACT_CLASS = 'keysView-require-contact-keys-reactivation';
    const REQUIRE_ADDRESS_CLASS = 'keysView-require-address-keys-reactivation';
    return {
	restrict: 'E',
	    replace: true,
	    scope: {},
	    templateUrl: 'views/keysView.tpl.html',
	    link(scope, el) {
	    const updateUser = function() {
		const user = authentication.user;
		const contactAction = '';
		const value = user.Keys.some(function(decrypted) { return !decrypted; });
		if(value)
		    contactAction = 'add';
		else 
		    contactAction = 'remove';
		
		scope.userKeys = getUserKeys(user, addressesModel.getByUser(user));
		scope.isSubUser = user.subuser;

		console.log(scope);

		el[0].classList[contactAction](REQUIRE_CONTACT_CLASS);
	    }

	    const addresses = addressesModel.get();

	    const updateAddresses = function(addresses) {
		const value = addresses.some(function(Keys) { 
			Keys.filter(function(decrypted) { 
				!decrypted.length
				    });
		    });
		const addressAction = '';
		if (value)
		    addressAction = 'add';
		else 
		    addressAction = 'remove';
	       
		scope.addressKeys = getAddressKeys(addresses);
		
		console.log(scope);

		el[0].classList[addressAction](REQUIRE_ADDRESS_CLASS);
	    }

	    updateAddresses();
            updateUser();
	}
    }
} 
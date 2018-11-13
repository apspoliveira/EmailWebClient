angular.module('webmail.keys')
    .factory('checkKeysFormat', checkKeysFormat);
function checkKeysFormat($injector) {
    return function(user)  {
        for (var i = 0; i < user.Keys.length; i++) {
            const key = user.Keys[i];
	    
            if (key.Version < KEY_VERSION && key.decrypted) {
                return false;
            }
        }
	
	const addresses = $injector.get('addressesModel').getByUser(user);
	
	for (var i = 0; i < addresses.length; i++) {
            const addressKeys = addresses[i].Keys;
	    
            for (var j = 0; j < addressKeys.length; j++) {
                const key = addressKeys[j];
		
                if (key.Version < KEY_VERSION && key.decrypted) {
                    return false;
                }
            }
        }
        return true;
    };
}
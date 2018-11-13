angular.module('webmail.user')
    .factory('manageUser', manageUser);
function manageUser($exceptionHandler, $rootScope, addressesModel, addressWithoutKeysManager, authentication, setupKeys) {
    const CACHE = {};

    const I18N = {
        REVOKE_ADMIN_RELOAD: 'Your admin privileges have been revoked.',
        REVOKE_ADMIN_RELOAD_INFO: 'The app will now be reloaded in a few seconds'
    };

    const getPromise = function(OrganizationPrivateKey, password) {
        if (OrganizationPrivateKey) {
            return pmcrypto.decryptPrivateKey(OrganizationPrivateKey, password);
        }
    };
    
    const storeKeys = function(keys) {
        authentication.clearKeys();
        _.each(keys, function(address, key, pkg) {
		authentication.storeKey(address.ID, key.ID, pkg);
	    });
    };
    
    /**                                                                                               
     * Upgrade addesses for a user based on what's coming from                                         
     *      - Event User                                                                              
     *      - SetupKeys output                                                                       
     * @param {Object} user                                                                            
     * @param {Array} keys                                                                             
     * @param {Array} dirtyAddresses Addresses without keys                                             
     * @return {void}                                                                                  
     */
    const upgradeAddresses = function(user, keys, dirtyAddresses) {
	// Use what's coming from setupKeys (:warning: some key are duplicated)                  
	const list = keys.reduce(
		     function(acc, address) {
			 // First item coming from setupKeys is empty               
			 if (address.ID !== MAIN_KEY && !acc.map[address.ID]) {
			     acc.map[address.ID] = true;
			     acc.list.push(address);
			 }
			 return acc;
		     }, { map: Object.create(null), list: [] });
	
	const addresses = list.concat(dirtyAddresses);
	var index = addresses.length;
	
	while (index--) {
            const address = addresses[index];
            const found = addressesModel.getByID(address.ID, user, true);

            if (angular.isUndefined(found)) {
                addresses.splice(index, 1);
            }
        }

	addressesModel.set(addresses);
    }
    
    const mergeUser = function(user, keys, dirtyAddresses) {
	_.each(Object.keys(user), function(key) {
		if (key !== 'Addresses') {
		    authentication.user[key] = user[key];
		}
	    });
	
	upgradeAddresses(user, keys, dirtyAddresses);
	_.extend($rootScope.user, authentication.user);
	$rootScope.$broadcast('updateUser');
    }

    const generateKeys = function(user, Members, keys) {
	return addressWithoutKeysManager.manage(user, _.map(Members, 'Member'), true).then(
	       function(addresses)  { 
		   if (addresses.length) {
		       throw new Error('Regenerate keys for addresses');
		   }
	       },
	       function() { storeKeys(keys)
	       });
    }

    function manageUser(User, Members) {
        // Init value on load              
	if (angular.isUndefined(CACHE.previousRole)) {
            CACHE.previousRole = authentication.user.Role;
        }

	if (angular.isUndefined(User.Role)) {
            return;
        }
	
	if (User.Role === FREE_USER_ROLE) {
            // Necessary because there is no deletion event for organizations          
            $rootScope.$emit('organizationChange', { data: { PlanName: 'free', HasKeys: 0 } });
        }
	
	// Revoke admin, we reload the app to clear the context                                           
        if (CACHE.previousRole === CONSTANTS.PAID_ADMIN_ROLE && User.Role !== CONSTANTS.PAID_ADMIN_ROLE) {
	    CACHE.previousRole = User.Role;
	    return _.delay(function() {
		    window.location.reload();
		});
	}

	CACHE.previousRole = User.Role;
	const password = authentication.getPassword();

	try {
            const organizationKey = getPromise(User, password);
	    var { dirtyAddresses, keys } = setupKeys.decryptUser(User, addressesModel.get(), organizationKey, password);
	    generateKeys(User, Members, keys);
	    storeKeys(keys);
	    mergeUser(User, keys, dirtyAddresses);
	} catch (e) {
            e; //&& $exceptionHandler(e);
        }
    }

    return manageUser;
}
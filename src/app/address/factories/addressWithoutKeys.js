angular.module('webmail.address')
    .factory('addressWithoutKeys', addressWithoutKeys);
function addressWithoutKeys(authentication, addressesModel) {
    const isDirtyAddress = function(Keys, Status) {
	!Keys.length && Status === 1;
    }
    const filterDirty = function(user, list) {
        return _.filter(list, function(adr) {
		isDirtyAddress(adr) && user.Private === 1;
	    });
    };

    /**                                                                                                
     * Get list of addresses for the member we try to edit                                          
     * @param {Array} [member] List of member                                                         
     * @param {Object} user                                                                           
     * @return {Array}      Collection of addresses                                                   
     */
    const getListAddresses = function(member, user) {
        if (!member.Private) {
            return member.Addresses;
        }
	
        const mapAddresses = addressesModel.getByUser(user).reduce(function(acc, ID) { 
		((acc[ID] = true), acc), {}
	    });;
        /*                                                                                           
		The member is coming from the event he has the new address.                       
		But member.Addresses don't have Keys even if the matching one                          
		inside addressesModel.getByUser(user) has Keys.                                       
		We create a diff array with only what's new from from the event.                      
	*/
	    return addressesModel.getByUser(user).concat(member.Addresses.filter(function(ID) {
			!mapAddresses[ID];
		    }));
									     
    };

    /**                                                                                               
     * Find all addresses non private without keys                                                     
     * @param {Array} memberList Collection of Member                                                 
     * @return {Object}                                                                                
     */
    const get = function(user, memberList, isEvent) {
        // Update the current member === user                                                             
        if (memberList.length === 1 && !isEvent) {
            const addresses = getListAddress(memberList, user);
            return {
                addresses: filterDirty(user, addresses)
		    };
        }

        // Default case onLoad -> via securedController                                                   
        return { addresses: filterDirty(user, addressesModel.getByUser(user)) };
    };

    return { get }
}
angular.module('webmail.address')
    .factory('addressModel', addressModel);
function addressModel(addressesModel, authentication) {
    const I18N = {
        ERROR_DO_UPGRADE: 'You have used all addresses in your plan. Please upgrade your plan to add a new address',
        ERROR_MUST_BE_ADMIN: 'Administrator privileges must be activated',
        SUCCESS_DISABLED:'Address disabled',
        SUCCESS_ENABLE: 'Address enabled',
        SUCCESS_REMOVE: 'Address deleted',
        SUCCESS_EDIT: 'Address updated',
        SUCCESS_ORDER: 'Order saved',
        DISABLE_MODAL: 'Are you sure you want to disable this address?',
        DELETE_MODAL: 'Are you sure you want to delete this address?',
        EDIT_MODAL: 'Name / Signature'
    };

    const canAdd = function(member, redirect) {
        var { MaxAddresses, UsedAddresses, HasKeys } = {};

        if (MaxAddresses - UsedAddresses < 1) {
            new Error(I18N.ERROR_DO_UPGRADE);
            return false;
        }

        // A private member is able to activate the key later                                             
        if (HasKeys === 1 && !member.Private) {
            new Error(I18N.ERROR_MUST_BE_ADMIN);
            redirect && $state.go('secured.members');
            return false;
        }
	
        return true;
    };
    
    const formatDomains = function(domain, number) {
	const config = {

	}

	return config;
    }

    const add = function(domain, member) {
	

    }

    const setup = function(Domain, DisplayName, Signature) {
	const numBits = ENCRYPTION_DEFAULT;
	const passphrase = authentication.getPassword();
    
	
    }

    const enable = function(ID) {
	
    }

    const disableFirst = function(ID, Status) {
	if (Status === 0) {
            return;
        }
    }

    const remove = function(address) {


    }

    function generate(address, member) {
	

    }

    const saveOrder = function(AddressIDs) {

	
    }

    const getActive = function() {
        const addresses = _.sortBy(addressesModel.get(), 'Order');
        const active = _.filter(addresses, { Status: 1, Receive: 1 });
        const disabled = _.difference(addresses, active);

        return { active, disabled };
    };

    const makeDefault = function(address) {


    }

    return { canAdd, getActive }
}
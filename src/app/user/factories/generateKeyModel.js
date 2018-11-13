angular.module('webmail.user')
    .factory('generateKeyModel', generateKeyModel);
function generateKeyModel(Key, setupKeys) {
    const STATE = {
        QUEUED: 0,
	GENERATING: 1,
	DONE: 2,
	SAVED: 3,
	ERROR: 4
    };
    
    const onSuccess = function(address, key) {
        address.state = STATE.SAVED;
        address.Keys = address.Keys || [];
        address.Keys.push(key);

        return address;
    };

    const getStates = function() {
	STATE;
    }
    
    const generate = function(numBits, passphrase, organizationKey, memberMap, address) {
        try {
	    address.state = STATE.GENERATING;
	    var { privateKeyArmored: PrivateKey } = pmcrypto.generateKey({
		    userIds: [{ name: address.Email, email: address.Email }],
		    passphrase,
                numBits
		});

	    address.state = STATE.DONE;

	    const member = memberMap[address.ID] || {};
	    if (member.ID) {
                const keys = setupKeys.generateAddresses(address, 'temp', numBits);
                const key = setupKeys.memberKey('temp', keys[0], member, organizationKey);
                return onSuccess(address, key);
            }
	    
	    const data = Key.create({ AddressID: address.ID, PrivateKey });
            return onSuccess(address, data.Key);
	} catch (err) {
            const data = err || {};
            address.state = STATE.ERROR;
            throw new Error(data.Error);
        }
    }

    return { generate, getStates };
}
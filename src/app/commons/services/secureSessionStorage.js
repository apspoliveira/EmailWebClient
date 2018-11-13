angular.module('webmail.commons')
    .factory('secureSessionStorage', secureSessionStorage);
function secureSessionStorage(webcrypto) {
    
    const storage = window.sessionStorage;
    var nameStorage;
    try {
        nameStorage = JSON.parse(window.name);
    } catch (e) {
        nameStorage = {};
    }

    var data = {};

    const whitelist = [
		       OAUTH_KEY + ':SessionToken',
		       OAUTH_KEY + ':UID',
		       'proton:decrypted_token',
		       'proton:encrypted_password'
		       ];
    
    for (var i = 0; i < whitelist.length; i++) {
        if (!nameStorage.hasOwnProperty(whitelist[i])) {
            continue;
        }

	var item = storage.getItem(whitelist[i]);
        var nameItem = nameStorage[whitelist[i]];
    
	if (!angular.isString(item) || !angular.isString(nameItem)) {
            continue;
        }

	try {
            item = pmcrypto.binaryStringToArray(pmcrypto.decode_base64(item));
            nameItem = pmcrypto.binaryStringToArray(pmcrypto.decode_base64(nameItem));
        } catch (e) {
            continue;
        }
	
        if (item.length !== nameItem.length) {
            continue;
        }
	
	const xored = new Array(item.length);

        for (var j = 0; j < item.length; j++) {
            xored[j] = item[j] ^ nameItem[j];
        }

	// Strip off padding                                                                          
	var unpaddedLength = item.length;
	
	while (unpaddedLength > 0 && xored[unpaddedLength - 1] === 0) {
            unpaddedLength--;
        }

        data[whitelist[i]] = pmcrypto.arrayToBinaryString(xored.slice(0, unpaddedLength));
    };
       
    storage.clear();
    window.name = '';
    nameStorage = {};

    const api = {
        getItem(key) {
            if (angular.isString(key) && data.hasOwnProperty(key)) {
                return data[key];
            } else {
                return null;
            }
        },

        setItem(key, value) {
            if (angular.isString(key) && angular.isString(value)) {
                data[key] = value;
            }
        },

        removeItem(key) {
            if (angular.isString(key) && data.hasOwnProperty(key)) {
                delete data[key];
            }
        },

        clear() {
            data = {};
        }
    };

    var flush = function() {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                const item = pmcrypto.binaryStringToArray(data[key]);
                const paddedLength = Math.ceil(item.length / 256) * 256;

                var share1 = webcrypto.getRandomValues(new Uint8Array(paddedLength));
                var share2 = new Uint8Array(share1);

                for (var i = 0; i < item.length; i++) {
                    share2[i] ^= item[i];
                }

                nameStorage[key] = pmcrypto.encode_base64(pmcrypto.arrayToBinaryString(share1));
                storage.setItem(key, pmcrypto.encode_base64(pmcrypto.arrayToBinaryString(share2)));
            }
        }

        if (!_.isEmpty(nameStorage)) {
            window.name = JSON.stringify(nameStorage);
        }
    };

    if (window.addEventListener) {
	window.addEventListener('unload', flush, false);
    } else if (window.attachEvent) {
        window.attachEvent('onunload', flush);
    } else {
        throw new Error('No method for adding event listeners!');
    }

    return api;
}
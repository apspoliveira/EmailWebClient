angular.module('webmail.user')
    .factory('signatureModel', signatureModel);
function signatureModel(authentication) {
    const I18N = {
        SUCCESS_UPDATE: 'Signature updated'
    };
    
    const changePMSignature = function(status) {
	const PMSignature = +!!status;
	

    }
    

}
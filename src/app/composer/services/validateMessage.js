angular.module('webmail.composer')
    .factory('validateMessage', validateMessage);
function validateMessage(authentication) {

    const cleanEmails = function(message) {
	console.log(message);
        /*message.ToList.concat(message.CCList, message.BCCList).forEach(function(item) {
		item.Address = item.Address.trim();
		})*/
    };

    function validate(message) {
        if (message.MIMEType !== PLAINTEXT) {
	    console.log(message);
            message.setDecryptedBody(message.getDecryptedBody());
        }
	
        cleanEmails(message);
    }


    function checkSubject(Subject) {
        if (Subject) {
            return;
        }

	return new Promise(function(resolve, reject)  {

	});
    }

    return { validate };
}
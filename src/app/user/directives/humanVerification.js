angular.module('webmail')
.directive('humanVerification', humanVerification);

function humanVerification(User, signupModel) {
    const SELECTOR = {
        FORM_EMAIL: '.humanVerification-formEmail-container',
        FORM_SMS: '.humanVerification-formSms-container'
    };

    const getDestination = function(type, value) { 
	if (type === 'sms')
	    key = 'Phone';
	else 
	    key = 'Address';
	return { [key]: value };
    };

    const sendVerificationCode = function(Type, Value) {
	const promise = User.code({
	    Username: signupModel.get('username'),
	    Type,
	    Destination: getDestination(Type, Value)
	}).then(function(data) {
	    data.Code = 1000;
	});
	
        return promise;
    }
    
    return {
	replace: true,
	scope: {
	    model: '='
	},
	templateUrl: 'user/directives/humanVerification.html',
	controller: 'SignupController',
	link(scope, el) {
	    
	    const $formSMS = el.find(SELECTOR.FORM_SMS);
	    const $formEMAIL = el.find(SELECTOR.FORM_EMAIL);

	     const onSubmitSMS = function() {
		 sendVerificationCode('sms', scope.model.smsVerification).then(function(test) {
		 });
	     };

	     const onSubmitEmail = function() {
		 sendVerificationCode('email', scope.model.emailVerification).then(function(test) {
		     });
	    };
	    
            $formSMS.on('submit', onSubmitSMS);
            $formEMAIL.on('submit', onSubmitEmail);
	     
	 }
    }
};

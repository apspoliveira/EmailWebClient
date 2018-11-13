angular.module('webmail.user')
    .directive('humanVerification', humanVerification);

function humanVerification(User, $state, signupModel) {
    const SELECTOR = {
        FORM_EMAIL: '.humanVerification-formEmail-container',
        FORM_SMS: '.humanVerification-formSms-container',
        BTN_COMPLETE_SETUP: '.humanVerification-completeSetup-create'
    };
    
    /**                                                                                                  
     * Build Destination object config,                                                                  
     * - type: email => Address                                                                          
     * - type: sms => Phone                                                                              
     * @param {String} type                                                                              
     * @param {String} value                                                                             
     * @return {Object}                                                                                  
     */
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
    };

    const getVerificator = function(scope) {
        if (scope.showCaptcha) {
            return 'captcha';
        }
        if (scope.showEmail) {
            return 'email';
        }
        if (scope.showSms) {
            return 'sms';
        }
    };
    
    return {
	replace: true,
	    scope: {
	    model: '='
		},
	    templateUrl: 'user/directives/humanVerification.html',
	    controller: 'SignupController',
	    link(scope, el) {
    
	    var offerType = 1;

	    const $formSMS = el.find(SELECTOR.FORM_SMS);
	    const $formEMAIL = el.find(SELECTOR.FORM_EMAIL);
	    const $btnSetup = el.find(SELECTOR.BTN_COMPLETE_SETUP);
	    
	    signupModel.getOptionsVerification(offerType).then(function({ email, captcha, sms, payment }) {
		    scope.$applyAsync(function () {
			    scope.showEmail = email;
			    scope.showCaptcha = captcha;
			    scope.showSms = sms;
			    scope.showPayment = payment;
			    scope.verificator = getVerificator(scope);
			});
		});
	    
	    //                                                                                                       // @TODO RFR each form => component + model and remove facepalm boolean                     
	    //
            const onSubmitSMS = function(e) {
	        e.stopPropagation();
                e.preventDefault();
                scope.$applyAsync(function() { 
			scope.smsSending = true;
		    });
                sendVerificationCode('sms', scope.model.smsVerification).then(function(test) {
			signupModel.set('smsVerificationSent', test);
			signupModel.set('verificationSent', false);
			scope.model.smsVerificationSent = test;
			scope.model.verificationSent = false;
			scope.smsSending = false;
		    });
		    };
	 
	    const onSubmitEmail = function(e) {
		e.stopPropagation();
                e.preventDefault();
                sendVerificationCode('email', scope.model.emailVerification).then(function(test) {
			scope.model.verificationSent = test;
			scope.model.smsVerificationSent = false;
			signupModel.set('smsVerificationSent', false);
			signupModel.set('verificationSent', test);
			});
	    };
	    
            $formSMS.on('submit', onSubmitSMS);
            $formEMAIL.on('submit', onSubmitEmail);

	    scope.$on('$destroy', function () {
		    $formSMS.off('submit', onSubmitSMS);
		    $formEMAIL.off('submit', onSubmitEmail);
		});

	}
    }
};
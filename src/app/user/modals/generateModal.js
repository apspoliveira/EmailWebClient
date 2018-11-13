angular.module('webmail.user')
    .factory('generateModal', generateModal);
function generateModal(authentication, Key, generateKeyModel, setupKeys, addressWithoutKeys) {
    const STATE = generateKeyModel.getStates();

    return {
	controllerAs: 'ctrl',
	    templateUrl: 'user/modals/generate.html',
	    /* @ngInject */
	    controller: function(params, $scope) {
	    this.size = ENCRYPTION_DEFAULT; // To match the [radio] value                  
            this.process = false;
            this.title = params.title;
	    this.message = params.message;
            // Kill this for now                                                                          
            this.askPassword = false; // = params.password.length === 0;                                  
            this.password = param.password;
            this.cancel = function() {
		params.close();
	    }
            this.addresses = _.map(params.addresses, function(adr) {
		    ((adr.state = STATE.QUEUED), adr);
		});
	    
	    $scope.$on('updateUser', function() {
		    !addressWithoutKeys.fromUser().length && this.cancel();
		});

	    this.submit = function() {
                this.process = true;
                const promise = Promise.all(
					    _.map(this.addresses, function(address) {
						    generateKeyModel.generate({
							    address,
							    numBits: this.size,
							    passphrase: this.password,
							    organizationKey: params.organizationKey,
							    memberMap: params.memberMap
							})
						})
					    .then(function(addresses) {
						    addresses.forEach(function(Email) {
							});
						})
					    .then(params.onSuccess)
					    .catch(function(e) {
						    params.close(this.addresses, this.password);
						    throw e;
						})
					    );
					   
	    }
	}
    }
}
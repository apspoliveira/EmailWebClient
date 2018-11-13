angular.module('webmail.authentication')
.directive('helpLoginModal', function() {
            return {
		controllerAs: 'ctrl',
		    templateUrl: 'authentication/modals/helpLoginModal.html',
		    /* @ngInject */
		    controller: function(params) {
		    this.cancel = params.close;
		}
	    }
    });    
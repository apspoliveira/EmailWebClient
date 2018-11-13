angular.module('webmail.user')
    .directive('addressesSection', addressesSection);
function addressesSection(addressModel, addressesModel, userType) {
    const getAddresses = function() {
        var { active, disabled } = addressModel.getActive();

        return { active: _.filter(active, { Send: 1 }), disabled };
    }
    
    return {
        scope: {},
	    replace: true,
	    restrict: 'E',
	    templateUrl: 'user/directives/addressesSection.html',
	    link(scope) {
	    const updateAddresses = function() {
		scope.$applyAsync(function() {
			var { active, disabled } = getAddresses();
			
			scope.activeAddresses = active;
			scope.disableAddresses = disabled;
		    });
	    }
	    const updateUserType = function() {
                scope.$applyAsync(function() {
			var { isAdmin, isFree } = userType();

			scope.isAdmin = isAdmin;
			scope.isFree = isFree;
		    });
            };
	    scope.itemMoved = false;
            scope.getDomain = function(Email) {
                const email = Email.split('@');
                return email;
            };
	    scope.aliasDragControlListeners = {
                containment: '.pm_form',
                accept(sourceItemHandleScope, destSortableScope) {
                    return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
                },
                dragStart() {
                    scope.itemMoved = true;
                },
                dragEnd() {
                    scope.itemMoved = false;
                },
                orderChanged() {
                    const address = scope.activeAddresses.concat(scope.disableAddresses);
                    const newOrder = addresses.map(function(ID) {
			    ID;
			});

                    addressesModel.saveOrder(newOrder);
                }
            };

	    updateAddresses();
            updateUserType();
	}
    }
}
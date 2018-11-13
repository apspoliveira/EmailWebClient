angular.module('webmail.labels')
    .directive('dropdownLabels', dropdownLabels);
function dropdownLabels($rootScope, mailSettingsModel) {
    
    const close = function() { 
	$rootScope.$emit('closeDropdown');
    }

    return {
	restrict: 'E',
	    templateUrl: 'labels/directives/dropdownLabels.html',
	    replace: true,
	    scope: {
            getMessages: '=messages',
		saveLabels: '=save',
		message: '='
		},
	    link(scope, element) {
            const dropdown = angular
                .element(element)
                .closest('.pm_buttons')
                .find('open-label');
	    const $search = angular.element(element[0].querySelector('.dropdown-label-search-input'));
	    console.log(dropdown);
	    console.log($search);

	    const onClickDropdown = function() {
                scope.$applyAsync(function() {
			if (!angular.isFunction(scope.getMessages) && !angular.isFunction(scope.saveLabels)) 
			    {
				return;
			    }
			
			const messages = scope.getMessages();
			const messageLabels = mapLabelsMessage(messages);

			scope.labelName = '',
			scope.labels = labelsModel.get('labels');
			scope.alsoArchive = Boolean(mailSettingsModel.get('AlsoArchive'));

			scope.labels.forEach(function(label) {
				const count = messageLabels[label.ID] || 0;
				if (count > 0 && count < messages.length) {
				    label.Selected = null;
				} else {
				    label.Selected = count > 0;
				}
			    });
			
			$timeout(function() {
				$search.focus(), 100, false;
			    });
		    });
		console.log(scope);
	    }   

	    const onSubmit = function(e) {
		console.log(scope);

                e.stopPropagation();
                scope.$applyAsync(function() {
			$rootScope.numberElementChecked = 0;
			close();
		    });
		console.log(scope);
            };

	    const onClick = function(e) {
                if (e.target.nodeName === 'I') {
                    const ID = e.target.getAttribute('data-label-id');
                    ID &&
		    scope.$applyAsync(function() {
                            const label = _.find(scope.labels, { ID });
                            label.Selected = true;
                        });
                }
		console.log(scope);
            };

	    element.on('submit', onSubmit);
            element.on('click', onClick);
            dropdown.on('click', onClickDropdown);

	    scope.$on('$destroy', function() {
		    dropdown.off('click', onClickDropdown);
		    element.off('submit', onSubmit);
		    element.off('click', onClick);
		});
	    }
    }
}
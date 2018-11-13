angular.module('webmail.elements')
    .directive('elementsSelector', elementsSelector);
function elementsSelector(mailSettingsModel) {
    const isChecked = true;
    const ORDER_FALSY = ['all', 'read', 'unread', 'star', 'unstar'];
    const ORDER_TRUTHY = ['all', 'unread', 'read', 'unstar', 'star'];

    const ACTIONS = {
        all: {
            label: 'Select All',
            icon: 'fa-check-square-o',
            action: 'all'
        },
        unread: {
            label: 'All Unread',
            icon: 'fa-eye-slash',
            action: 'unread'
        },
        read: {
            label: 'All Read',
            icon: 'fa-eye',
            action: 'read'
        },
        unstar: {
            label: 'All Unstarred',
            icon: 'fa-star-o',
            action: 'unstarred'
        },
        star: {
            label: 'All Starred',
            icon: 'fa-star',
            action: 'starred'
        }
    };

    const map = function(list) {
	console.log(list);
	list.map(function(key) {
		ACTIONS[key];
	    });
    }

    const orderActions = function() {
        const order = mailSettingsModel.get('MessageButtons');
	console.log(order);

        if (!order) {
            return map(ORDER_FALSY);
        }

        return map(ORDER_TRUTHY);
    };

    const getTemplate = function() {
	return orderActions().reduce((prev, function(label, icon, action) {
		    return (
			    prev +
			    `
			    <button data-action="${action}" class="elementsSelector-btn-action">
			    <i class="fa ${icon}"></i>
			    <span>${label}</span>
			    </button>
			    `
			    );
		}, '')); 
    }

    return {
        replace: true,
	    templateUrl: 'elements/directives/elementsSelector.html',
	    compile(element) {
	    console.log(element[0]);
            const dropdown = element[0].querySelector('.inheritPadding');
	    console.log(dropdown);
	    dropdown.insertAdjacentHTML('beforeEnd', getTemplate());	    
	    
	    return function(scope, el) {
		const $btn = el.find('.elementsSelector-btn-action');
		console.log($btn);
		const updateView = function() {
                    scope.$applyAsync(function() {
			    scope.viewLayout = mailSettingsModel.get('ViewLayout');
			});
                };

		$btn.on('click', onClick);
		function onClick(currentTarget) {
                    const action = currentTarget.getAttribute('data-action');
		}
		
		scope.checkedSelectorState = function() {
		    console.log(scope.conversations);
		    _.every(scope.conversations, { Selected: true });
		}
		updateView();

		scope.$on('$destroy', function() {
			$btn.off('click', onClick);
		    });
	    }
	}
    }
}
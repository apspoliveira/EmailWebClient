angular.module('webmail.elements')
    .directive('advancedFilterElement', advancedFilterElement);
function advancedFilterElement($stateParams, $state) {
	const getClass = function(name) {
	    `advancedFilterElement-${name}`;
	}
	
	const ACTIVE_CLASS = 'active';

	const BUTTONS_CLASS = {
	    [getClass('btn-small-to-large')]: function() {
		$stateParams.sort === 'size'
	    },
	    [getClass('btn-large-to-small')]: function() {
		$stateParams.sort === '-size'
	    },
	    [getClass('btn-old-to-new')]: function() {
		$stateParams.sort === 'date'
	    },
	    [getClass('btn-new-to-old')]: function() {
		!$stateParams.sort || $stateParams.sort === '-date'
	    },
	    [getClass('btn-show-all')]: function() {
		(!$stateParams.sort || $stateParams.sort === '-date') && !$stateParams.filter
	    },
	    [getClass('btn-unread')]: function () {
		$stateParams.filter === 'unread'
	    },
	    [getClass('btn-read')]: function() {
		$stateParams.filter === 'read'
	    }
	};

	const clearState = function(state) { 
	    state.replace('.element', '');
	}
	const switchState = function(opt) {
	    console.log(clearState($state.$current.name));
	    $state.go(clearState($state.$current.name),
		      _.extend({}, $state.params, { page: undefined, id: undefined }, opt )
		      );
	};

	/**                                                                                        
	 * Empty specific location                                                                 
	 * @param {String} mailbox                                                                  
	 */
	const empty = function(mailbox) {
	    const title = 'Delete all';
	    const message = 'Are you sure? This cannot be undone.';

	    if (['drafts', 'spam', 'trash', 'folder'].indexOf(mailbox) === -1) {
		return;
	    }
	    
	    const labelID = $stateParams.label || MAILBOX_IDENTIFIERS[mailbox];
	    const MAP_ACTIONS = {
		drafts: 'emptyDraft',
		spam: 'emptySpam',
		trash: 'emptyTrash',
		folder: 'emptyLabel'
	    };
	}

	/**                                                                                         
	 * Filter current list                                                                       
	 * @param {String}                                                                          
	 */
	const filterBy = function(filter) {
	    switchState(filter);
	}

	/**                                                                                           
	 * Order the list by a specific parameter                                                   
	 * @param {String} criterion                                                               
	 */
	const orderBy = function(sort) {
	    switchState({ sort: sort });
	}

	/**                                                                                       
	 * Clear current filter                                                                    
	 */
	const clearFilter = function() {
	    switchState({ filter: undefined, sort: undefined });
	}

	const toggleTrashSpam = function() {
	    switchState({
		    trashspam: undefined
		});
	}

	const ACTIONS =  { empty, orderBy, filterBy, clearFilter, toggleTrashSpam };
	
	return {
	    replace: true,
		templateUrl: 'elements/directives/advancedFilterElement.html',
		link(scope, el) {
		const $btns = el.find('button');
		console.log($btns);

		const onClick = function(e) {
		    console.log(e);
		    const action = e.target.getAttribute('data-action');
		    console.log(action);
		    action && ACTIONS[action](e.target.getAttribute('data-action-arg'));
		};

		_.each($btns, function(button) {
			const cssClass = button.classList.item(0);
			BUTTONS_CLASS[cssClass] && BUTTONS_CLASS[cssClass]() && button.classList.add(ACTIVE_CLASS);
		    });

		const bindClass = function() {
		    const labelID = $stateParams.label;
		    const action = '';
		    if (labelID)
			action = 'add';
		    else 
			action = 'remove';

		    el[0].classList[action]('advancedFilterElement-state-folder');
		};

		bindClass();

		$btns.on('click', onClick);

		scope.$on('$destroy', function() {
			$btns.off('click', onClick);
		    });
	    }	
	}
}
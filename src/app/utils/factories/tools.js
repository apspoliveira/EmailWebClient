angular.module('webmail.utils')
    .factory('tools', tools);
function tools($state, $stateParams) {
    const MAILBOX_KEYS = Object.keys(MAILBOX_IDENTIFIERS);
    console.log(MAILBOX_KEYS);

    var state = $state.$current.name;
    console.log(state);
   
    const filteredState = function(state)  { 
	state.replace('secured.', '').replace('.element', '');
    }

    const currentLocation = function() {
        const mailbox = currentMailbox();
	const loc;
	if (mailbox === 'label')
	    loc = mailbox;
	else if ($stateParams.label)
	    loc = $stateParams.label;
	else 
	    loc = MAILBOX_IDENTIFIERS[mailbox];

        return loc;
    };
    
    function currentMailbox() {
        const mailbox = filteredState();
	
        if (_.includes(MAILBOX_KEYS, mailbox)) {
            return mailbox;
        }

        return false;
    }

    const getTypeList = function(name) {
        const specialBoxes = ['drafts', 'search', 'sent', 'allDrafts', 'allSent'];
        const box = name || currentMailbox();
        const ViewMode = mailSettingsModel.get();
        const threadingIsOff = ViewMode === MESSAGE_VIEW_MODE;

        if (threadingIsOff || _.includes(specialBoxes, box)) {
            return 'message';
        }

        return 'conversation';
    };

}
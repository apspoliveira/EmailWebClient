angular.module('webmail.sidebar')
    .factory('sidebarModel', sidebarModel);
function sidebarModel (mailSettingsModel) {
    const ShowMoved = mailSettingsModel.get();

    const draftsIncluded = function () {
	ShowMoved & 1;
    }
    const sentIncluded = function() {
	ShowMoved & 2;
    }
    
    const getStateConfig = function() {
	const defaultDrafts, defaultSent;
	if (draftsIncluded())
	    defaultDrafts = 'secured.allDrafts';
	else
	    defaultDrafts = 'secured.drafts';

	if (sentIncluded())
	    defaultSent = 'secured.allSent';
	else 
	    defaultSent = 'secured.sent';

	return {
            inbox: {
                state: 'secured.inbox',
		    label: 'Inbox',
		    icon: 'fa-inbox'
		    },
		drafts: {
                state: defaultDrafts,
		    states: ['secured.allDrafts', 'secured.drafts'],
		    label: 'Drafts',
		    icon: 'fa-file-text-o'
		    },
		sent: {
                state: defaultSent,
		    states: ['secured.allSent', 'secured.sent'],
		    label: 'Sent',
		    icon: 'fa-send'
		    },
		starred: {
                state: 'secured.starred',
		    label: 'Starred',
		    icon: 'fa-star-o'
		    },
		archive: {
                state: 'secured.archive',
		    label: 'Archive',
		    icon: 'fa-archive'
		    },
		spam: {
                state: 'secured.spam',
		    label: 'Spam',
		    icon: 'fa-ban'
		    },
		trash: {
                state: 'secured.trash',
		    label: 'Trash',
		    icon: 'fa-trash-o'
		    },
		allmail: {
                state: 'secured.allmail',
		    label: 'All Mail'
		    }
        };
    };
    
    

}
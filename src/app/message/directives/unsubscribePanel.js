angular.module('webmail.message', [])
    .directive('unsubscribePanel', unsubscribePanel);
function unsubscribePanel() {
    const I18N = {
	notice: 'This message is from a mailing list.',
	kb: 'Learn more',
	button: 'Unsubscribe',
	title: 'Unsubscribe from mailing list?',
    }
    
    return {
        replace: true,
	    restrict: 'E',
	    template: `
	              <div class="unsubscribePanel-container">
	              <div class="unsubscribePanel-notice">
	              <span class="unsubscribePanel-notice-text">${I18N.notice}</span>
		      <a class="unsubscribePanel-notice-link" href="https://protonmail.com/support/knowledge-base/auto-unsubscribe" target="_blank">${I18N.kb}</a>
		      </div>
	              <button type="button" class="unsubscribePanel-button pm_button">${I18N.button}</button>
                      </div>
	    `,
	    link(scope, element) {
	    const $button = element.find('.unsubscribePanel-button');
	    const onClick = function() {

	    }

	    $button.on('click', onClick);

	    scope.$on('$destroy', function() {
		    $button.off('click', onClick);
		});
	}
    }
}
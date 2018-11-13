angular.module('webmail.ui')
    .directive('twitterLink', twitterLink);
function twitterLink($httpParamSerializer) {
    return {
	restrict: 'A',
	    link(scope, element, attributes) {
	    // https://dev.twitter.com/web/tweet-button/web-intent  
	    const webIntentUrl = 'https://twitter.com/intent/tweet';
	    var { text, url, hashtags, via, related, inReplyTo } = attributes;
	    const parameters = $httpParamSerializer({ text, url, hashtags, via, related, inReplyTo });
            element[0].setAttribute('href', webIntentUrl + '?' + parameters);
	}
    }
}
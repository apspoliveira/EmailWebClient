angular.module('webmail.ui')
    .factory('pageTitlesModel', pageTitlesModel);
function pageTitlesModel($injector) {
    const DISPLAY_NUMBER = ['inbox', 'drafts', 'sent', 'starred', 'archive', 'spam', 'trash', 'allmail', 'allDrafts', 'allSent'];
    
    
}
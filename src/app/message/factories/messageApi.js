angular.module('webmail')
    .factory('messageApi', messageApi);
function messageApi($http, url) {
    const requestURL = url.build('messages');

    const send = function(params) {
        return $http.post(url.build('messages/'+params.id), params); // send
    };
    
    const createDraft = function(params) {
	return $http.post(url.build('messages/draft'), params);
    }

    const get = function(messageID) {
	return $http.get(url.build('messages/'+messageID));
    }

    const query = function(params) {
        return $http.get(requestURL, params);
    }

    const count = function() {
	return $http.get(url.build('messages/count'));
    }

    const updateDraft = function(params) {
	const messageID = params.ID || params.id;
        return $http.put(url.build('messages/draft/'+messageID), params);
    }

    const star = function(params) {
	return $http.put(url.build('messages/star'), params);
    }

    const unstar = function(params) {
	return $http.put(url.build('messages/unstar'), params);
    }

    const read = function(params) {
	return $http.put(url.build('messages/read'), params);
    }

    const unread = function(params) {
	return $http.put(url.build('messages/unread'), params);
    }

    const trash = function(params) {
	return $http.put(url.build('messages/trash'), params);
    }

    const inbox = function(params) {
	return $http.put(url.build('messages/inbox'), params);
    }

    const spam = function(params) {
	return $http.put(url.build('messages/spam'), params);
    }

    const archive = function(params) {
	return $http.put(url.build('messages/archive'), params);
    }

    const destroy = function(params) {
	return $http.put(url.build('messages/delete'), params);
    }

    const undelete = function(params) {
	return $http.put(url.build('messages/undelete'), params);
    }

    const label = function(LabelID, Action, MessageIDs) {
	return $http.put(url.build('label'), {LabelID, Action, MessageIDs });
    }

    const emptyDraft = function() {
	return $http.delete(url.build('messages/draft'));
    }

    const emptySpam = function() {
	return $http.delete(url.build('messages/spam'));
    }

    const emptyTrash = function() { 
	return $http.delete(url.build('messages/trash'));
    }

    const emptyLabel = function(Label) {
	return $http.delete(url.build('messages/empty'), { params: Label });
    }
	
    return {
        send,
	    createDraft,
	    get,
	    query,
	    count,
	    updateDraft,
	    star,
	    unstar,
	    read,
	    unread,
	    trash,
	    inbox,
	    spam,
	    archive,
	    delete: destroy,
	    undelete,
	    label,
	    emptyDraft,
	    emptySpam,
	    emptyTrash,
	    emptyLabel
	    };
}

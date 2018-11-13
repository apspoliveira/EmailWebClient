angular.module('webmail.utils')
    .factory('eventManager', eventManager);
function eventManager() {
    const MODEL = {
        index: 0,
        milliseconds: INTERVAL_EVENT_TIMER
    };

    function start() {
        if (!MODEL.promiseCancel) {
            MODEL.promiseCancel = $timeout(interval, 0, false);
        }

	console.log(MODEL);
    }

    return { start };
}
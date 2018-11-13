angular.module('webmail.labels')
    .factory('labelsModel', labelsModel);
function labelsModel() {
    
    const IS_LABEL = 0;
    const IS_FOLDER = 1;

    const CACHE = {
        labels: [],
        folders: [],
        all: [],
        map: {
            all: {},
            folders: {},
            labels: {}
        }
    };

    /**                                                                                             
     * Get all ids per type                                                                          
     * @param {String} type all (default) | folders | labels                                         
     * @return {Array}                                                                                 
     */
    const ids = function(type) {
	Object.keys(CACHE.map[type] || {});
    }

    return { ids }
}
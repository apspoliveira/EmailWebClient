angular.module('webmail.ui')
    .factory('backState', backState);
function backState($state, mailSettingsModel) {
    /**                                                                                                
     * Keep a trace of the previous box state to let the user back to mail                           
     * Action present in the settings and contact sidebar                                            
     */
    const CACHE = {};
    const cleanState = function(state) {
	state.replace('.element', '');
    }   

    function back() {
	const ViewMode = mailSettingsModel.get();
    }
}
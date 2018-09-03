angular.module('webmail.commons');

function AppModel($rootScope) {
    const MODEL = {};
    function dispatch(type, data) { $rootScope.$emit('AppModel', { type, data }) };
    function set(key, value) {
	const previous = MODEL[key];
	MODEL[key] = value;
	previous !== value && dispatch(key, { value });
	//console.log(MODEL);
    };
    function is(key) { !!MODEL[key]; }
    function get(key) { MODEL[key]; }
    function store(key, value) { (MODEL[key] = value); }
					     
    return { is, set, store, get };
}
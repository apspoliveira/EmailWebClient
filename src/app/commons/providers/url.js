angular.module('webmail.commons')
    .factory('url', url);
function url() {
    var base = 'https://mail.protonmail.com/api';

    const make = function(key, prefix) { 
	var url = [`${prefix}/${key}`.trim()].join('/');
	return url;
    };

    function get() {
	return base;
    }
    
    function build(key) {
	return make(key, get());
    };

    return { build, get, make };
}

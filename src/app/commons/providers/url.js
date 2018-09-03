angular.module('webmail.commons')
    .factory('url', url);
function url() {
    //var base = 'http://localhost:8000/#!';
    var base = 'https://mail.protonmail.com/api';
    //var base = 'https://api.protonmail.ch'
    //var prefix = '';

    const make = function(key, prefix) { 
	var url = [`${prefix}/${key}`.trim()].join('/');
	//console.log(url);
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

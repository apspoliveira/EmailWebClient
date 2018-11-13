const hasSessionStorage = function() {
    console.log('has session storage');
    const mod = 'modernizr';
    try {
        sessionStorage.setItem(mod, mod);
        sessionStorage.removeItem(mod);
        return true;
    } catch (error) {
        return false;
    }
};
const hasCookie = function() { 
    console.log('has cookie');
    navigator.cookieEnabled };
const getBrowser = function () { $.ua.browser };
const getDevice = function () { $.ua.device };

const getOS = function() {
    const name = $.ua.os;
    return name;
};
const isSafari = function() { ['Safari', 'Mobile Safari'].includes($.ua.browser.name) };
const isSafariMobile = function() { $.ua.browser.name === 'Mobile Safari' };
const isIE11 = function() { $.ua.browser.name === 'IE' && $.ua.browser.major === '11' };
const isEdge = function() { $.ua.browser.name === 'Edge' };
const isFirefox = function() { $.ua.browser.name === 'Firefox'};
const isChrome = function() { $.ua.browser.name === 'Chrome' };
const isMac = function() { getOS().name === 'Mac OS' };
const hasTouch = ('ontouchstart' in document.documentElement);

const isFileSaverSupported = function() { 'download' in document.createElement('a') || navigator.msSaveOrOpenBlob };

const prngAvailable = function() {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
        return true;
    } else if (typeof window !== 'undefined' && typeof window.msCrypto === 'object' && typeof window.msCrypto.getRandomValues === 'function') {
        return true;
    }

    return false;
};

const doNotTrack = function() {
    return navigator.doNotTrack === '1' || navigator.doNotTrack === 'yes' || navigator.msDoNotTrack === '1' || window.doNotTrack === '1';
};

/**
 * Open an URL inside a new tab/window and remove the referrer 
 * @links { https://mathiasbynens.github.io/rel-noopener} 
 * @param {String} url 
 * @return {void}
 */
function openWindow(url) {
    if (isSafari()) {
        const anchor = document.createElement('A');
        anchor.setAttribute('rel', 'noreferrer nofollow noopener');
        anchor.setAttribute('target', '_blank');
        anchor.href = url;
        return anchor.click();
    }

    const win = window.open();
    win.opener = null;
    win.location = url;
}

const parseURL = function(url) {
    const parser = document.createElement('a');
    const searchObject = {};
    var split;
    // Let the browser do the work 
    parser.href = url;
    // Convert query string to object 
    const queries = parser.search.replace(/^\?/, '').split('&');

    for (var i = 0; i < queries.length; i++) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }

    return {
        protocol: parser.protocol,
        host: parser.host, 
        hostname: parser.hostname, 
        port: parser.port, 
        pathname: parser.pathname, 
        search: parser.search, 
        searchObject, 
        hash: parser.hash 
    };
};
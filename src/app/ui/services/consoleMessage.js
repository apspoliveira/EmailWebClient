angular.module('webmail.ui')
    .factory('consoleMessage', consoleMessage);
function consoleMessage() {
    const styles = {
        span: 'color: #505061; font-size: 14px;',
        string: 'color: #505061; font-size: 14px; font-weight: bold;',
        alert: 'color: #FF5956; font-size: 18px; font-weight: bold;',
        alertSpan: 'color: #FF5956; font-size: 14px;',
        link: 'color: #9397cd; font-size: 14px;'
    };

    return function() {


    }
}
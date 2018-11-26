angular.module('webmail')
    .directive('composer', composer);
function composer() { 
    return  { 
	templateUrl: 'templates/composer/composer.html'
    }
}

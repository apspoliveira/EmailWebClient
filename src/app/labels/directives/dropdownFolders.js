angular.module('webmail.labels')
    .directive('dropdownFolders', dropdownFolders);
function dropdownFolders(labelsModel, $rootScope) {
     const mailboxes = [
			{
			    Name: 'Inbox',
			    ID: MAILBOX_IDENTIFIERS.inbox,
			    Order: 9999,
			    className: 'fa-inbox'
			},
			{
			    Name:'Archive',
			    ID: MAILBOX_IDENTIFIERS.archive,
			    Order: 9999,
			    className: 'fa-archive'
			},
			{
			    Name: 'Spam',
			    ID: MAILBOX_IDENTIFIERS.spam,
			    Order: 9999,
			    className: 'fa-ban'
			},
			{
			    Name: 'Trash',
			    ID: MAILBOX_IDENTIFIERS.trash,
			    Order: 9999,
			    className: 'fa-trash-o'
			}
			];

     const close = function() {
	 $rootScope.$emit('closeDropdown');
     }

     return {
	 restrict: 'E',
	     templateUrl: 'labels/directives/dropdownFolders.html',
	     scope: {
	     getElements: '=elements'
		 },
	     link(scope, element) {
	       const dropdown = angular
		   .element(element)
		   .closest('.pm_buttons')
		   .find('.open-folder');
	       console.log(dropdown);
	       const search = element[0].querySelector('.dropdown-folder-search-input');
	       console.log(search);

	       function onClickDropdown() {
		   const id = setTimeout(function() {
			   (search.focus(), clearTimeout(id)), 100
		       });
	       }
	 
	       function onClickList(event) {
		   if (event.target.tagName !== 'BUTTON') {
		       return;
		   }
		   
		   if (event.target.classList.contains('dropdown-folder-scrollbox-group-item-button')) {
		       scope.$applyAsync(function() {
			       const folderID = event.target.getAttribute('data-folder-id');
			       const elements = scope.getElements();
			       console.log(folderID);
			       console.log(elements);
			       $rootScope.numberElementChecked = 0;
			   })
			   }
	       }	       

	       dropdown.on('click', onClickDropdown);
	       element.on('click', onClickList);

	       scope.$on('$destroy', function() {
		       dropdown.off('click', onClickDropdown);
		       element.off('click', onClickList);
		   });
	     }
     }
}
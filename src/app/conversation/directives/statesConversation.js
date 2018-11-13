angular.module('webmail.conversation')
    .directive('statesConversation', statesConversation);
function statesConversation() {
    return { 
	template: `
	   <i class="fa" ng-class="{                                                                     
                'fa-mail-reply': conversation.IsReplied,                                                  
                'fa-mail-reply-all': conversation.IsRepliedAll,                                           
                'fa-mail-forward': conversation.IsForwarded                                               
            }"></i>
	    `
	    }
}
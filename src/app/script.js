//"use babel";
angular.module('app', ['ui.router'])

    .config(function($stateProvider/*, $urlServiceProvider*/) {
	//$urlServiceProvider.rules.otherwise({ state: 'userlist' });

	$stateProvider.state('userlist', {
		url: '/users', 
		    //component: 'users',
		    templateUrl: 'partials/users.html', 
		    controller: 'UsersController', 
		    /*resolve: {
		    users: function(UserService) {
			return UserService.list();
			}
			}*/
	    });
	
	$stateProvider.state('userlist.detail', {
		url: '/:userId',
		    //component: 'userDetail',
		    templateUrl: 'partials/userDetail.html', 
		    controller: 'UserDetailController' 
		    /*resolve: {
		    user: function($transition$, users) {
			//return users.find(user => user.id == $transition$.params().userId);
			}
			}*/
	    });
	
	/*$stateProvider.state('userlist.detail.edit', {
		url: '/edit', 
		    views: {
		    // Targets the default (unamed) ui-view 
		    // from the grandparent state.
		    // This replaces the `userDetail` component 
		    "$default@^.^": {
			component: 'userEdit', 
			    bindings: {
			    originalUser:'user' }
		    }
		},
		});*/

    })

.controller('UsersController', function($scope, users) {
	$scope.users = users;
	$scope.clickHandler = function() {
	    alert('something');
	}
    })

.controller('UserDetailController', function($scope, user) {
	    $scope.user = user;
	})

    
.service('UserService', function($http) {
	return {
	    list: function() {
		//return $http.get('./data/users.json', { cache: true }).then(resp => resp.data)
		    }
	};
    })                              

/*var service = {
		list: function() {
		    // return $http.get('./data/users.json', { cache: true }).then(resp => resp.data) 
		},
		get: function(id) {
		    // return service.list().then(list => list.find(item => item.id === id));
		}
	    };

	    return service;
	    })*/

// preload resources in case plunker times out 
    .run(function($http, $templateRequest) {
	$http.get('data/users.json', { cache: true });
	$templateRequest('partials/users.html');
	$templateRequest('partials/userDetail.html');
	})
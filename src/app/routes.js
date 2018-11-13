angular.module('webmail.routes', [])
    .config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/signup', {
			templateUrl: 'views/signup.html',
			    controller: 'SignupController'
			    });
	    }])
    .config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/helpLoginModal', {
			templateUrl: 'authentication/modals/helpLoginModal.html',
			    controller: 'helpLoginModalController'
			    });
	    }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/signupUserForm', {
                        templateUrl: 'user/directives/signupUserForm.html',
                            controller: 'SignupController'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/signupHumanForm', {
                        templateUrl: 'user/signupHumanForm.html',
                            controller: 'SignupHumanFormController'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/signupCreationProcess', {
                        templateUrl: 'user/directives/signupCreationProcess.html',
                            controller: 'SignupController'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/usernameDomain', {
                        templateUrl: 'user/directives/usernameDomain.html',
                            controller: 'UsernameDomainController'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/usernamePassword', {
                        templateUrl: 'user/directives/usernamePassword.html',
                            controller: 'UsernamePasswordController'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/base', {
			templateUrl: 'notifications/base.html',
			    controller: 'BaseController'
			    });
	    }])
    .config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/humanVerification', {
			templateUrl: 'user/directives/humanVerification.html',
			    controller: 'SignupController'
			    });
	    }])
    .config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/login', {
			controller: 'LoginController',
			    templateUrl: 'views/login.html'
			    });
	    }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/support', {
                        controller: 'SupportController',
                            templateUrl: 'layout/auth.html'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/support/message', {
			templateUrl: 'views/support-message.html'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/support/reset-login-password', {
                        templateUrl: 'views/reset-login-password.html'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/login/unlock', {
                        controller: 'LoginController',
                            templateUrl: 'views/unlock.html'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/login/setup', {
                        controller: 'SetupController',
                            templateUrl: 'views/setup.html'
			    });
	    }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/dashboard', {
			templateUrl: 'views/dashboard.html'
                            });
	    }])  
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/account', {                                          
			templateUrl: 'views/account.html'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/secured/inbox', {
                        controller: 'ElementsController',
			    templateUrl: 'partials/conversations.html'
                            });
	    }])
    .config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/secured', {
			controller: 'SecuredController',
			    templateUrl: 'layout/secured.html'
			    });
	    }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/sidebar', {
                        controller: 'SidebarController',
                            templateUrl: 'layout/sidebar.html'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/pre-invite', {
			templateUrl: 'layout/pre.html'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/pgp', {
                        templateUrl: 'views/pgp.html'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/printer', {
                        templateUrl: 'views/message.print.html'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/labels', {
                        templateUrl: 'views/labels.html',
			    controller: 'LabelsController'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/security', {
                        templateUrl: 'views/security.html',
                            controller: 'SecurityController'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/keys', {
                        template: '<keys-view></keys-view>'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/vpn', {
                        template: '<vpn-view></vpn-view>'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/members', {
                        templateUrl: 'views/members.html',
			    controller: 'MembersController'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/domains', {
                        templateUrl: 'views/domains.html',
                            controller: 'DomainsController'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/bridge', {
                        template: '<bridge-view></bridge-view>'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/filters', {
                        template: '<filter-view></filter-view>'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/autoresponse', {
                        template: '<autoresponse-view></autoresponder-view>'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/contacts', {
                        template: '<contact-view></contact-view>'
                            });
            }])
    .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/secured/contact/details', {
                        template: '<contact-right-panel></contact-right-panel>'
                            });
            }])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	    const conversationParameters = function()  {
		const parameters = [
				    'email',
				    'address',
				    'page',
				    'filter',
				    'sort',
				    'label',
				    'from',
				    'to',
				    'subject',
				    'keyword',
				    'begin',
				    'end',
				    'attachments',
				    'wildcard',
				    'starred',
				    'reload',
				    'welcome'
				    ];
		
		return parameters.join('&');
	    };
	    
	    $stateProvider
		
		// ------------                                                                   
		// LOGIN ROUTES                                                                     
		// ------------   
		
		.state('login', {
			url: '/login'
		    })
		
		.state('login.unlock', {
			url: '/login/unlock'
		    })
		
		.state('login.setup', {
			url: '/login/setup'
		    })
		
		.state('signup', {
			url: '/signup'
		    })

		// --------------------------------------                                             
		// SUPPORT ROUTES                                                                     
		// --------------------------------------  
		.state('support', {
			url: '/support'
			    })

		.state('support.message', {
			url: '/support/message'
			    })

		.state('support/reset-login-password', {
			url: '/support/reset-login-password'
			    })

		// ------------------------------------------                                        
		// SECURED ROUTES                                                                     
		// this includes everything after login/unlock                                       
		// ------------------------------------------    
		
		.state('contacts', {
			url: '/contacts'
			    })

		.state('autoresponse', {
			url: '/autoresponse'
			    })
		
		.state('bridge', {
			url: '/bridge'
			    })

		.state('filters', {
			url: '/filters'
			    })

		.state('domains', {
			url: '/domains'
			    })
		
		.state('members', {
			url: '/members'
			    })

		.state('vpn', {
			url: '/vpn'
			    })
		
		.state('keys', {
			url: '/keys'
			    })

		.state('security', {
			url: '/security'
			    })
	       
		.state('labels', {
			url: '/labels'
			    })

		.state('printer', {
			url: '/printer'
			    })

		.state('pgp', {
			url: '/pgp'
			    })

		.state('secured.contact.details', {
			url: '/secured/contact/details'
			    })
	         
		.state('secured', {
			//abstract: true,
			// This is included in every secured.* sub-controller
			url: '/secured',
			    views: {
			    'main@': {
				controller: 'SecuredController',
				    templateUrl: 'layout/secured.html'
				    },
				'sidebar@secured': {
				    controller: 'SidebarController',
					templateUrl: 'layout/sidebar.html'
					}
			}
		    })
		
		.state('secured.dashboard', {
			url: '/dashboard',
			    templateUrl: 'views/dashboard.html'
			    })
		
		.state('account', {
			url: '/account',
			    templateUrl: 'views/account.html'
			    })
		
		Object.keys(MAILBOX_IDENTIFIERS).forEach(function(box) {
			const parentState = box;
			const childState = box + '.element';
		       
			const url = '/secured'+'/'+box;
			
			console.log(parentState);
			console.log(childState);
			console.log(url);
			
			const views = {
			    'content@secured': {
				controller: 'ElementsController',
				templateUrl: 'partials/conversations.html'
			    }
			};
			
			$stateProvider.state(parentState, {
				url,
				    views
				    });
			
			const elementView = {
			    [`view@secured.${box}`]: {
				template: '<element-view></element-view>'
			    }
			};
			
			$stateProvider.state(childState, {
				url: '/{id}',
				    views: elementView
				    });	
		    });
	    
	    console.log($stateProvider);
	    
	    $urlRouterProvider.otherwise(function($injector) {
		    const $state = $injector.get('$state');
		    console.log($state);
		    const stateName = $injector.get('authentication').state() || 'secured.inbox';
		    console.log(stateName);
		    return $state.go(stateName);
		});
	    
	});
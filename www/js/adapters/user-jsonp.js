define(function(require) {
	
	"use strict";
	
	var $ = require('jquery'),
			url = 'http://vfapi.ng.bluemix.net/user/',
			
			authentication_token = null,
			
			authenticationToken = function() {
				return authentication_token;
			},
			
			getAuthenticationToken = function(user) {
				return $.post(url+'login', user, 'json')
					.done(function(token) {
						authentication_token = token;
						console.log('Successfully Authenticated!');
					});
			},
			
			authenticated = function() {
				if (authentication_token === null) {
					return false;
				}
				else {
					return true;	
				}
			};
			
	return {
		authenticationToken: authenticationToken,
		authenticated: authenticated,
		getAuthenticationToken: getAuthenticationToken
	};
			
});
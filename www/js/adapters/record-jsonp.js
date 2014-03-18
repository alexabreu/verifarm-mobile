define(function(require) {
	
	"use strict";
	
	var $ 					 	= require('jquery'),
			userAdapter  	= require('adapters/user'),
			url 					= 'http://vfapi.ng.bluemix.net/gaplog/',
			
			save = function(record) {
				return $.ajax({
				  type: 'post',
				  headers: {'x-vf-ticket': userAdapter.authenticationToken()},
				  url: url,
				  data: record
				}).fail(function(jqXHR, textStatus, error) {
					console.log(error);
				});
			}
			
	return {
		save: save
	};
			
});
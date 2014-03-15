define(function(require) {
	
	"use strict";
	
	var $ = require('jquery'),
			url = 'http://vfapi.ng.bluemix.net/gaplog',
			token = null,
			
			save = function(record, authentication_token) {
				return $.ajax({
				  type: "post",
				  headers: {'x-vf-ticket': authentication_token},
				  url: url,
				  data: record
				});
			}
			
	return {
		save: save
	};
			
});
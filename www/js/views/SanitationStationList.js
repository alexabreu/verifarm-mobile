define(function (require) {
	"use strict";
	
	var $ 									=	require('jquery'),
			Backbone 						=	require('backbone'),
			Handlebars 					=	require('handlebars'),
			userAdapter      		= require('adapters/user'),
			models							= require('app/models/SanitationStation'),
			item								=	require('text!tpl/SanitationStationItem.html'),
			html 								=	require('text!tpl/SanitationStationList.html'),
			template 						= Handlebars.compile(html),
			i_template 					= Handlebars.compile(item);
	
	return Backbone.View.extend({
		
		intialize: function() {
			this.render();
		},
		
		render: function() {
			this.$el.html(template(this.collection.toJSON()));
			return this;
		}
		
	});
	
});
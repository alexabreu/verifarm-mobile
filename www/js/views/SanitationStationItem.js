define(function (require) {
	"use strict";
	
	var Backbone 						=	require('backbone'),
			Handlebars 					=	require('handlebars'),
			html 								=	require('text!tpl/SanitationStationItem.html'),
			template 						= Handlebars.compile(html);
	
	return Backbone.View.extend({
		
		intialize: function() {
			this.render();
		},
		
		render: function() {
			this.$el.html(template(this.model.toJSON()));
			return this;
		},
		
		
	});
	
	
});
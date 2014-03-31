define(function(require) {

	"use strict";
	
	 var $                   = require('jquery'),
	 		 Handlebars          = require('handlebars'),
	 		 Snap 							 = require('snap'),
	 		 menuHtml            = require('text!tpl/Menu.html'),
	 		 menuTpl						 = Handlebars.compile(menuHtml);
	 		 
	 		 
	 return function () {
	 
		 this.initialize = function() {
			 this.$el = $('<div/>');
		 };
		 
		 this.render = function() {
			 this.$el.html(menuTpl);
			 return this;
		 };
	 
		 this.initialize();
	 };
	
});
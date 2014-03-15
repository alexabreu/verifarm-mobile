define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Handlebars          = require('handlebars'),
        productAdapter      = require('adapters/product'),
        userAdapter      		= require('adapters/user'),
        recordAdapter      	= require('adapters/record'),
        homeHtml            = require('text!tpl/Home.html'),
        productListItemHtml = require('text!tpl/ProductListItem.html'),

        homeTpl = Handlebars.compile(homeHtml),
        productListItemTpl = Handlebars.compile(productListItemHtml);


    return function () {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');
            this.$el.on('keyup', '.search-key', this.findByName);
            this.$el.on('submit', 'form', this.saveSanitationStationRecord);
            if (!userAdapter.authenticated()) {
	            userAdapter.getAuthenticationToken();
            }
        };

        this.render = function () {
            this.$el.html(homeTpl());
            return this;
        };

        this.findByName = function () {
            productAdapter.findByName($('.search-key').val()).done(function (products) {
                $('.product-list').html(productListItemTpl(products));
            });
        };
        
        this.saveSanitationStationRecord = function (e) {
        	e.preventDefault();
        	var log = $('form').serializeArray();
        	log.time = $.now();
        	log.type = 'restroom_inspection';
        	var record = {log: log};
        	console.log(record);
	        recordAdapter.save(record, userAdapter.authenticationToken())
	        	.done(function(data) {
		      		console.log(data); 
		      	})
		      	.fail(function(error) {
		      		console.log(error);			      	
		      	})
		      	.always(function(data) {
			      	console.log(data);
		      	});
        };

        this.initialize();

    };

});


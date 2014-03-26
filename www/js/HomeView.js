define(function (require) {

    "use strict";

    var $                   = require('jquery'),
    		Utilities						= require('utilities'),
        Handlebars          = require('handlebars'),
        productAdapter      = require('adapters/product'),
        userAdapter      		= require('adapters/user'),
        recordAdapter      	= require('adapters/record'),
        homeHtml            = require('text!tpl/Home.html'),
        productListItemHtml = require('text!tpl/ProductListItem.html'),
        Snap 								= require('snap'),

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

						
						this.$el.on('click', '.menu-trigger', function(e) {
							var snapper = new Snap({
							  element: $('.content')[0],
							  addBodyClasss: true,
							  tapToClose: true,
							  hyperextensible: true,
							  disable: 'right'
							});
							if( snapper.state().state=="left" ){
					        snapper.close();
					    } else {
					        snapper.open('left');
					    }
						});
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
        	var log = Utilities.stringify($('form').serializeArray());
        	
        	log.time = $.now();
        	log.type = 'restroom_inspection';
        	var record = {log: log};
        	console.log(record);
	        recordAdapter.save(record)
	        	.done(function(data) {
		      		console.log(data); 
		      	})
		      	.fail(function(jqXHR, textStatus, error) {
		      		console.log(error);			      	
		      	});
        };

        this.initialize();

    };

});


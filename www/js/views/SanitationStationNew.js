define(function (require) {

    "use strict";

    var $                   = require('jquery'),
    		Utilities						= require('utilities'),
        Handlebars          = require('handlebars'),
        productAdapter      = require('adapters/product'),
        userAdapter      		= require('adapters/user'),
        recordAdapter      	= require('adapters/record'),
        productListItemHtml = require('text!tpl/ProductListItem.html'),
        tplText         		= require('text!tpl/SanitationStationNew.html'),
        template 						= Handlebars.compile(tplText);


    return Backbone.View.extend({

        initialize: function () {
            this.render();
        },
        
        events: {
            "keyup .search-key":    "search",
            "keypress .search-key": "onkeypress",
            "submit form": "saveSanitationStationRecord"
        },

       render: function () {
            this.$el.html(template());
            return this;
        },

        findByName: function () {
            productAdapter.findByName($('.search-key').val()).done(function (products) {
                $('.product-list').html(productListItemTpl(products));
            });
        },
        
        saveSanitationStationRecord: function (e) {
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
        }
        
    });

});


define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Handlebars          = require('handlebars'),
        Utilities         	= require('utilities'),
        userAdapter      		= require('adapters/user'),
        loginHtml           = require('text!tpl/Login.html'),

        loginTpl = Handlebars.compile(loginHtml);


    return function () {

        this.initialize = function () {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.$el = $('<div/>');
            this.$el.on('submit', 'form', this.signIn);

        };

        this.render = function () {
            this.$el.html(loginTpl());
            return this;
        };


        
        this.signIn= function (e) {
        	e.preventDefault();
        	var user = Utilities.stringify($('form').serializeArray());
        	userAdapter.getAuthenticationToken(user)
        		.done(function(data){
	        		window.location.href = "#";
        		});

        };

        this.initialize();

    };

});


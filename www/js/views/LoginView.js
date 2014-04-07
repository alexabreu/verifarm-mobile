define(function (require) {

    "use strict";

    var $                   = require('jquery'),
    		Backbone          	= require('backbone'),
        Handlebars          = require('handlebars'),
        Utilities         	= require('utilities'),
        userAdapter      		= require('adapters/user'),
        loginHtml           = require('text!tpl/Login.html'),

        template = Handlebars.compile(loginHtml);


    return Backbone.View.extend({

        initialize: function () {
            this.render();
        },
        
        events: {
        	"submit form": "signIn"
        },

        render: function () {
            this.$el.html(template());
            return this;
        },

        signIn: function (e) {
        	e.preventDefault();
        	var user = Utilities.stringify($('form').serializeArray());
        	userAdapter.getAuthenticationToken(user)
        		.done(function(data){
        			console.log(data);
        			Backbone.history.navigate("sanitation_stations", true);
        		});

        }

    });

});


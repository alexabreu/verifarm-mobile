require.config({

    baseUrl: 'lib',

    paths: {
        app: '../js',
        tpl: '../tpl'
    },

    map: {
        '*': {
            'adapters/product': 'app/adapters/product-memory',
            'adapters/record': 	'app/adapters/record-jsonp',
            'adapters/user': 		'app/adapters/user-jsonp'
        }
    },
    
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        },
        'underscore': {
            exports: '_'
        },
        'backbone_filters': {
	        deps: ['underscore', 'backbone']
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
        
    }
});

require(['jquery', 'backbone', 'backbone_filters', "fastclick", 'app/router'], function ($, Backbone, Filters, FastClick, Router) {
		
    "use strict";
    
    window.App = {
    	models: {},
    	collections: {},
    	views: {},
	    router:  new Router()
    };
    
    $(function () {
        FastClick.attach(document.body);
    });

    $("body").on("click", ".back-button", function (event) {
        event.preventDefault();
        window.history.back();
    });

    Backbone.history.start();
});
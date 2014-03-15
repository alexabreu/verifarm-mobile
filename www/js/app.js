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
        }
    }

});

require(["fastclick", 'app/router'], function (FastClick, router) {

    "use strict";

    $(function () {
       FastClick.attach(document.body);
    });

    router.start();

});

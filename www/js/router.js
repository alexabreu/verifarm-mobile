define(function (require) {

    "use strict";

    var $               = require('jquery'),
        productAdapter  = require('adapters/product'),
        MenuView        = require("app/MenuView"),
        HomeView        = require("app/HomeView"),
        ProductView     = require("app/ProductView"),
        PageSlider      = require("app/utils/PageSlider"),
        

        detailsURL = /^#products\/(\d{1,})/,
        slider = new PageSlider($("body")),
        homeView = new HomeView().render(),
        menuView = new MenuView().render(),

        route = function () {
        	
            var hash = window.location.hash,
                view,
                match;

            if (!hash) {
                view = homeView;

            }
	          else {
	
	            match = hash.match(detailsURL);
	            if (match) {
	                productAdapter.findById(Number(match[1])).done(function (product) {
	                    view = new ProductView(product).render();
	                });
	            }
            }
            
        		view.$el.find('nav').html(menuView.$el.find('.nav').clone());
            var snapper = new Snap({
							  element: view.$el.find('.content')[0],
							  addBodyClasss: true,
							  tapToClose: true,
							  touchToDrag: false,
							  hyperextensible: true,
							  disable: 'right'
						});
							
            view.$el.on('click', '.menu-trigger', function(e) {
							if( snapper.state().state == "left" ){
					        snapper.close();
					    } else {
					        snapper.open('left');
					        $(document.body).find('.page').removeClass();
					    }
						});

						snapper.close();
						slider.slidePage(view.$el);
						
						
        },

        start = function () {
            $(document.body).append(menuView.$el.find('.menu').clone());
            $(window).on('hashchange', route);
            route();
            
        };

    // The public API
    return {
        start: start
    };

});
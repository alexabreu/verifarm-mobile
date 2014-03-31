define(function (require) {

    "use strict";

    var $               = require('jquery'),
        productAdapter  = require('adapters/product'),
        MenuView        = require("app/MenuView"),
        HomeView        = require("app/HomeView"),
        ProductView     = require("app/ProductView"),
        LoginView     	= require("app/LoginView"),
        PageSlider      = require("app/utils/PageSlider"),
        

        detailsURL = /^#products\/(\d{1,})/,
        slider = new PageSlider($("body")),
        homeView = new HomeView().render(),
        menuView = new MenuView().render(),
        lastHash = "",

        route = function (e) {        
            var hash = window.location.hash,
                view,
                match;
            
            if (e && hash === lastHash) {
	            return;
            }
            lastHash = hash;
            
            if (!hash) {
                view = homeView;   
            }
            else if (hash === "#sign-in") {
	            view = new LoginView().render();
            }
            
	          else {
	            match = hash.match(detailsURL);
	            if (match) {
	                productAdapter.findById(Number(match[1])).done(function (product) {
	                    view = new ProductView(product).render();
	                });
	            }
            }
            
            var title = view.$el.find('nav').text();
        		view.$el.find('nav').html(menuView.$el.find('.nav').clone());
        		view.$el.find('nav h4').text(title);
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
					    }
						});

						snapper.close();
						slider.slidePage(view.$el, menuView.$el.find('.menu').clone());
						
        },

        start = function () {
            $(window).on('hashchange', route);
            route();
            
        };

    // The public API
    return {
        start: start
    };

});
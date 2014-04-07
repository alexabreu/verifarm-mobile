define(function (require) {

    "use strict";

    var $               				= require('jquery'),
        Backbone 								=	require('backbone'),
        MenuView        				= require("app/views/MenuView"),
/*         HomeView        			= require("app/views/HomeView"), */
        ProductView     				= require("app/views/ProductView"),
        LoginView     					= require("app/views/LoginView"),
        PageSlider      				= require("app/utils/PageSlider"),
        SanitationStationModel	= require("app/models/SanitationStation"),
        SanitationStationList 	=	require("app/views/SanitationStationList"),
        SanitationStationItem 	=	require("app/views/SanitationStationItem"),
        SanitationStationNew 		=	require("app/views/SanitationStationNew"),
        

        slider = new PageSlider($("body")),
/*         homeView = new HomeView().render(), */
        menuView = new MenuView().render();
        
/*     homeView.$el.append(menuView.$el.find('.menu').clone()); */
    
    return Backbone.Router.extend({
    		
    	
    		routes: {
    			""													: "signIn",	
      		"sign-in"										: "signIn",
      		"product/:id"								: "productDetails",
      		"sanitation_stations" 			: "sanitationStationsIndex",
      		"sanitation_stations/new" 	: "sanitationStationsNew",
      		"sanitation_stations/:id"		: "sanitationStationsItem"
      		
    		},
    		
    		before: {
      		'*any': function() {
      			if (window.location.hash === '#sign-in') {
	      			return true;
      			}
	      		return this.requireAuthentication();
      		} 
    		},
    		
    		after: {
	    		
    		},
    		
    		requireAuthentication: function() {
    			var hasAccess = $.isEmptyObject(window.localStorage.getItem("authentication-token")) ? false : true;
	    		if ( !hasAccess) {
	    			console.log('No authentication token found...');
	    			Backbone.history.navigate('sign-in', true);
	    		}
	    		else {
		    		$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
						  options.headers = {'x-vf-ticket': window.localStorage.getItem('authentication-token')}
						});
	    		}
	    		return hasAccess;
    		},
    		
    		
    		sanitationStationsIndex: function() {
    			var that = this;
	    		var collection = new SanitationStationModel.SanitationStationCollection();
					collection.fetch({
						success: function(data) {
							App.collections = {SanitationStations: data};
							var view = new SanitationStationList({collection: data}).render();
							view.delegateEvents();
							slider.slidePage(view.$el);
							that.addMenu(view);
						}
					});
		
    		},
    		
    		sanitationStationsItem: function(id) {
    			var that = this;
    			if (App.collections.SanitationStations) {
	    			var model = App.collections.SanitationStations.findWhere({_id: id});
	    			var view = new SanitationStationItem({model: model}).render();
								view.delegateEvents();
								slider.slidePage(view.$el);
								that.addMenu(view);
    			}
    			else {
    				var model = new SanitationStationModel.SanitationStationModel();
						model.fetch({
							success: function(data) {
								var view = new SanitationStationItem({model: data}).render();
								view.delegateEvents();
								slider.slidePage(view.$el);
								that.addMenu(view);
							}
						});
					}
		
    		},
    		
    		sanitationStationsNew: function() {
      		var view = new SanitationStationNew().render();
      		view.delegateEvents();
      		slider.slidePage(view.$el);
      		this.addMenu(view);
    		},
    		
    		signIn: function() {
        	var view = new LoginView().render();
        	view.delegateEvents();
        	console.log(view.$el);
          slider.slidePage(view.$el);
          this.addMenu(view);
        },
        
        addMenu: function(view) {
        		view.$el.append(menuView.$el.find('.menu').clone());
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
        },
				
    });

});
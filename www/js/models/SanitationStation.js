define(function (require) {
	"use strict";
	

	var Backbone 						=	require('backbone'),
			
			
			SanitationStationModel = Backbone.Model.extend({
				url: 'http://need-url-for-model'
			}),
			
			SanitationStationCollection = Backbone.Collection.extend({
				model: SanitationStationModel,
				url: 'http://vfapi.ng.bluemix.net/gaplog/'
			})
				
	return {
		SanitationStationModel : SanitationStationModel,
		SanitationStationCollection : SanitationStationCollection
	}
	
	
});
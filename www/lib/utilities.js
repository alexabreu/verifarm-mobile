define(function () {
		
		"use strict";
		
    var Utilities = {};
    
    Utilities.stringify = function(a) {
			var o = {};
			$.each(a,
		    function(i, v) {
		        o[v.name] = v.value;
		  });
		  return o;
		};
		
		return Utilities;
});
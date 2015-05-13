import Ember from 'ember';
/* global google */
/* global Cookies */
//import Cookies from 'cookies/js.cookies.js';

export default Ember.Route.extend({
	model: function(params){
		return this.store.find('tourStopDetail', params.id);
	},

	actions: {
		showDirections: function(lat, lng){
			
			//console.log(this.globals.preferredMode);

			var _this = this;
			
			Ember.$(".stop-article").toggle();
			Ember.$(".stop-directions").toggle();
			Ember.$("#directions").empty();

			var selectedMode = Cookies.get('selectedMode');

			if(typeof(selectedMode) != undefined){
				selectedMode = 'WALKING';
			}

			console.log(Cookies.get('selectedMode'));

			Ember.$(document).on('change','#mode_select',function(){
				Ember.$("#directions").empty();
				var selectedMode = Ember.$("#mode_select").val();
				console.log(selectedMode);
				Cookies.set('selectedMode', selectedMode);
				//_this.globals.set('preferredMode', selectedMode);
				//console.log(_this.globals.preferredMode);
				initializeMap(selectedMode, lat, lng);

			});

			function initializeMap(selectedMode, lat, lng, parkLng, parkLat){

				// Set the value the user last used
				Ember.$("#mode_select").val(selectedMode);

				//console.log(selectedMode);

				Ember.$(".loading").show();

				var container = Ember.$(".map-canvas");

		    	var stop = new google.maps.LatLng(
		      		lat,
		      		lng
		      	);

		    	var parking = null;

		    	if (typeof(parkLng) != "undefined" && typeof(parkLat) != "undefined") {
		    		parking = new google.maps.LatLng(
		    			parkLat,
		    			parkLng
		    		);
		    	}

		    	navigator.geolocation.getCurrentPosition(
		    		successCallback,
	                errorCallback,{
	                	maximumAge: 0,
	        			timeout: 50000
	        		}
	        	);

	    		function successCallback(position) {}

	    		function errorCallback() {
	      			Ember.$(".loading").hide();
			    	var marker = new google.maps.Marker({
			    		position: stop,
			    		map: map,
			    	});
			    	marker.setMap(map);
			    	// Use Google's geocoder to get the address base on the lat and lng.
                    var geocoder = new google.maps.Geocoder();
                    if (parking) {
                    	var location = parking;
                    }
                    else {
                    	var location = stop;
                    }

                    if(geocoder) {
                    	geocoder.geocode({
                    		'latLng': location
                    	},function(results, status){
                    		Ember.$('.fallback').show();
                    		if(status === google.maps.GeocoderStatus.OK){
                    			Ember.$("span.address").html(results[0].formatted_address);
                    		}
                    		else{
                    			Ember.$("span.address-warn").html('Unable to determine address.');
                    		}
                    	});
                    }
	    		}

				navigator.geolocation.getCurrentPosition(function(position){

		    		var currentLatLng = new google.maps.LatLng(
		  				position.coords.latitude,
		  				position.coords.longitude
		  			);

					var request = {
					    origin:currentLatLng,
					    destination:stop,
						travelMode: google.maps.TravelMode[selectedMode]
					};

					var directionsService = new google.maps.DirectionsService();
					var directionsDisplay = new google.maps.DirectionsRenderer();
					 
					directionsService.route(request, function(result, status) {
						if (status === google.maps.DirectionsStatus.OK) {

							directionsDisplay.setMap(map);
							
							// Draw route to map
					    	directionsDisplay.setDirections(result);

					    	// List turn-by-turn directions
						    directionsDisplay.setPanel(document.getElementById('directions'));

						    // Hide the loading indicator.
						    Ember.$(".loading").hide();

						    // Show mode selector.
						    Ember.$(".mode-select").show();

						    //initializeMap(selectedMode, lat, lng);


					    }

					    else {console.log('dang');}
					});
		    	});

				var options = {
	      			center: stop,
	      			zoom: 17,
	      			mapTypeId: google.maps.MapTypeId.ROADMAP
	    		};


				var map = new google.maps.Map(container[0], options);

			}

			//Ember.run.later((function() {


			initializeMap(selectedMode, lat, lng);

			//}), 5000);

	  	},
		
		hideMap: function() {
			Ember.$(".stop-article").show();
			Ember.$(".stop-directions").hide();
		}
	}
	

});
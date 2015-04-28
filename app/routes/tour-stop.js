import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		return this.store.find('tourStopDetail', params.id);
	},

	actions: {
		showDirections: function(lat, lng){
			console.log(lng);
			
			Ember.$(".stop-article").toggle();
			Ember.$(".stop-directions").toggle();
			Ember.$("#directions").empty();

			var selectedMode = document.getElementById('mode_select').value;

			Ember.$(document).on('change','#mode_select',function(){
				Ember.$("#directions").empty();
				var selectedMode = document.getElementById('mode_select').value;
				initializeMap(selectedMode, lat, lng);

			});

			function initializeMap(selectedMode, lat, lng){

				console.log(selectedMode);
				console.log(lat);

				Ember.$(".loading").show();

				var container = Ember.$(".map-canvas");

		    	var stop = new google.maps.LatLng(
		      		lat,
		      		lng
		      	);

		    	navigator.geolocation.getCurrentPosition(
		    		successCallback,
	                errorCallback,{
	                	maximumAge: 0,
	        			timeout:50000
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

					    	// Set the value the user last used
					    	Ember.$("#mode_select").val(selectedMode);

					    	// List turn-by-turn directions
						    directionsDisplay.setPanel(document.getElementById('directions'));

						    // Hide the loading indicator.
						    Ember.$(".loading").hide();

						    // Show mode selector.
						    Ember.$("#mode_select").show();

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

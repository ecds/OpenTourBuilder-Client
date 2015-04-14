import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function() {

		var _this = this;
		$("#directions").empty();

		var selectedMode = document.getElementById('mode_select').value;

		$(document).on('change','#mode_select',function(){
			$("#directions").empty();
			var selectedMode = document.getElementById('mode_select').value;
			initializeMap(selectedMode);

		});

		function initializeMap(selectedMode){

			$(".loading").show();

			var container = $(".map-canvas");

	    	var stop = new google.maps.LatLng(
	      		_this.get("latitude"),
	      		_this.get("longitude")
	      	);

	    	navigator.geolocation.getCurrentPosition(
	    		successCallback,
                errorCallback,{
                	maximumAge: 0,
        			timeout:50000
        		}
        	);

    		function successCallback(position) {
      			console.log(position)
    		}

    		function errorCallback() {
      			$(".loading").hide();
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
				    	$("#mode_select").val(selectedMode);

				    	// List turn-by-turn directions
					    directionsDisplay.setPanel(document.getElementById('directions'));

					    // Hide the loading indicator.
					    $(".loading").hide();

					    // Show mode selector.
					    $("#mode_select").show();

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

		initializeMap(selectedMode);

  	}.observes('latitude', 'longitude')
});

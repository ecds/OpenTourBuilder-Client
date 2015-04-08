import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function() {
    	var container = this.$(".map-canvas");

    	var foo;

    	var latLng = new google.maps.LatLng(
      		this.get("latitude"),
      		this.get("longitude")
      	);

    	navigator.geolocation.getCurrentPosition(function(position){

    		var currentLatLng = new google.maps.LatLng(
  				position.coords.latitude,
  				position.coords.longitude
  			);


			var request = {
			    origin:currentLatLng,
			    destination:latLng,
				travelMode: google.maps.TravelMode.DRIVING
			};

			var directionsService = new google.maps.DirectionsService();
			var directionsDisplay = new google.maps.DirectionsRenderer();
			 
			directionsService.route(request, function(result, status) {
				if (status === google.maps.DirectionsStatus.OK) {

					directionsDisplay.setMap(map);
			    	directionsDisplay.setDirections(result);
			    }
			    else {console.log('dang');}
			});
    	});

	    	var options = {
      			center: latLng,
      			zoom: 17,
      			mapTypeId: google.maps.MapTypeId.ROADMAP
    		};

			var map = new google.maps.Map(container[0], options);

	    	var marker = new google.maps.Marker({
	    		position: latLng,
	    		map: map,
	    		title: 'Hello'
	    	});
	    	marker.setMap(map);

  	}.observes('latitude', 'longitude')
});

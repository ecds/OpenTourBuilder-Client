import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		// If/when we change to Rails we will need to change this to the following
		// return this.store.find('tourDetail', {slug: params.slug});
		return this.store.find('tourDetail', params.slug);
	},

	actions: {

		toggleList: function(){
			$(".stop-list").toggle();
			$("button#stop-list-button").addClass("active").prop('disabled', true);
			$("button#map-overview-button").removeClass("active").prop('disabled', false);
			$(".overview-map").toggle();
		},

		mapTour: function initializeMap(){

			$(".stop-list").toggle();
			$(".overview-map").toggle();
			$("button#stop-list-button").removeClass("active").prop('disabled', false);
			$("button#map-overview-button").addClass("active").prop('disabled', true);

			var tour = DS.PromiseObject.create({
				promise: this.store.find('tourDetail', this.currentModel.id)
			});
			
			var activeWindow;
			
			var bounds = new google.maps.LatLngBounds();

			tour.then(function(){
				var stops = tour.get('content.stop_ids').get('content.currentState');

				$.each(stops, function(index, value){
				
					var stop = DS.PromiseObject.create({
						promise: this.store.find('tourStopDetail', value.id)
					});

					stop.then(function(){

						if (stop.get('content.intro')===false) {
							var stopCords = new google.maps.LatLng(
					      		stop.get('content.lat'),
					      		stop.get('content.lng')
		      				);

		      				bounds.extend(stopCords);

		      				var contentString = '<h1>' + stop.get('content.name') + '</h1>' +
		      									'<article>' + stop.get('content.metadescription') + '</article>';

		      				var infowindow = new google.maps.InfoWindow({
      							content: contentString
  							});

  							var icon = '/assets/images/markers/marker' + stop.get('content.position') + '.png';

		      				var marker = new google.maps.Marker({
							      position: stopCords,
							      map: map,
							      icon: icon
							 });
		      				google.maps.event.addListener(marker, 'click', function() {
		      					// If there is already an info window, close it.
		      					if(activeWindow != null) {
		      						activeWindow.close();
		      					}
    							infowindow.open(map,marker);
    							activeWindow = infowindow;
  							});
		      			}
					});

				});
			});

			var container = $(".overview-map");

			var options = {
      			zoom: 12,
      			mapTypeId: google.maps.MapTypeId.ROADMAP
    		};

			var map = new google.maps.Map(container[0], options);

			map.fitBounds(bounds);

		}

	}

});

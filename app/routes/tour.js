import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Route.extend({
	model: function(params){
		// If/when we change to Rails we will need to change this to the following
		// return this.store.find('tourDetail', {slug: params.slug});
		return this.store.find('tourDetail', params.slug);
	},

	actions: {

		toggleList: function(){
			Ember.$(".stop-list").toggle();
			Ember.$("button#stop-list-button").addClass("active").prop('disabled', true);
			Ember.$("button#map-overview-button").removeClass("active").prop('disabled', false);
			Ember.$(".overview-map").toggle();
		},

		mapTour: function initializeMap(){

			Ember.$(".stop-list").toggle();
			Ember.$(".overview-map").toggle();
			Ember.$("button#stop-list-button").removeClass("active").prop('disabled', false);
			Ember.$("button#map-overview-button").addClass("active").prop('disabled', true);

			var activeWindow;
			
			var map = null;

			var bounds = new google.maps.LatLngBounds();

			console.log(bounds);

			Ember.$(".overview-map").empty();

			var tour = DS.PromiseObject.create({
				promise: this.store.find('tourDetail', this.currentModel.id)
			});

			tour.then(function(){

				var stops = tour.get('content.stop_ids').get('content.currentState');

				Ember.$.each(stops, function(index, value){
				
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
		      				var mapEvent = google.maps.event.addListener(marker, 'click', function() {
		      					// If there is already an info window, close it.
		      					if(activeWindow != null) {
		      						activeWindow.close();
		      					}
    							infowindow.open(map,marker);
    							activeWindow = infowindow;
  							});

  							map.fitBounds(bounds);
		      			}
					});

				});
			});

			var container = Ember.$(".overview-map");

			var options = {
      			// zoom: 12,
      			// mapTypeId: google.maps.MapTypeId.ROADMAP
    		};

			map = new google.maps.Map(container[0], options);

			console.log(map.getCenter())

			

		}

	}

});

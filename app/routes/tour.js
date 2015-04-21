import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		// If/when we change to Rails we will need to change this to the following
		// return this.store.find('tourDetail', {slug: params.slug});
		return this.store.find('tourDetail', params.slug);
	},

	didInsertElement: function() {

	},

	actions: {
		mapTour: function initializeMap(){

			$(document).ready(function(){
  $(".dropdown-button").click(function() {
    $(".dropdown-menu").toggleClass("show-menu");
    $(".dropdown-menu > li").click(function(){
      $(".dropdown-menu").removeClass("show-menu");
    });
    $(".dropdown-menu.dropdown-select > li").click(function() {
      $(".dropdown-button").html($(this).html());
    });
  });
});



			var tour = DS.PromiseObject.create({
				promise: this.store.find('tourDetail', this.currentModel.id)
			});

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

		      				var marker = new google.maps.Marker({
							      position: stopCords,
							      map: map,
							      bounds: true
							 });
		      			}
					});

				});
			});

			var container = $(".overview-map");

			var options = {
      			center: new google.maps.LatLng(33.754318, -84.389791),
      			zoom: 12,
      			mapTypeId: google.maps.MapTypeId.ROADMAP
    		};

			var map = new google.maps.Map(container[0], options);

		}

	}

});

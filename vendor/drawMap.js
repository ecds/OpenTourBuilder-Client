// Draw directions map
function drawMap(stop){

    var selectedMode = Cookies.get('selectedMode');

    if(typeof(selectedMode) === "undefined"){
      selectedMode = 'WALKING';
    }
    var slug = stop.get('id'),
        elem = "#"+slug,
        lat = stop.get('lat'),
        lng = stop.get('lng');

    var $directions = Ember.$(elem + " .directions");

    Ember.$(elem).val(selectedMode);
    Ember.$(".selectize-input").html(selectedMode);

    initializeMap(elem, selectedMode, lat, lng);

    function initializeMap(elem, selectedMode, lat, lng, parkLng, parkLat){
      Ember.$(elem+" .direction-list").html('');

      // Set the value the user last used
      Ember.$(".mode_select").val(selectedMode);
      Ember.$(".selectize-input").html(selectedMode);
      Ember.$("[data-value="+selectedMode+"]").addClass("selected active");
      //
      $directions.addClass('loading');

      var container = Ember.$(elem+" .map-canvas");

        var stop = new google.maps.LatLng(
            lat,
            lng
          );

        var parking = null;

        if (typeof(parkLng) !== "undefined" && typeof(parkLat) !== "undefined") {
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

        function successCallback() {}

        function errorCallback() {
          $directions.removeClass('loading');
          var marker = new google.maps.Marker({
            position: stop,
            map: map,
          });
          marker.setMap(map);
          // Use Google's geocoder to get the address base on the lat and lng.
                  var geocoder = new google.maps.Geocoder();
                  var location;
                  if (parking) {
                    location = parking;
                  }
                  else {
                    location = stop;
                  }

                  if(geocoder) {
                    geocoder.geocode({
                      'latLng': location
                    },function(results, status){
                      Ember.$('.geoservice-warning').show();
                      Ember.$('.fallback').show();
                      Ember.$('#reload-map-button').hide();
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

              var list = Ember.$(elem+" .direction-list")[0];

              // List turn-by-turn directions
              directionsDisplay.setPanel(list);

              // Hide the loading indicator.
              $directions.removeClass('loading');

              // Show mode selector.
              Ember.$(".selectize-control").show();

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



    //}), 5000);
}

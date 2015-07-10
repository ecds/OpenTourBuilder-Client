import Ember from 'ember';
import DS from 'ember-data';
/* global google */

export default Ember.Component.extend({

  didInsertElement: function() {
    Ember.$("#map").empty();

    var model = this.get('model'),
        container = Ember.$(".overview-map"),
        options = {
          // zoom: 12,
          // mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        map = new google.maps.Map(container[0], options);

    var tour = DS.PromiseObject.create({
      promise: model.store.find('tourDetail',model.id)
    });

    tour.then(function(){

      var stops = tour.get('content.stop_ids').get('content.currentState');
      var activeWindow;
      var bounds = new google.maps.LatLngBounds();

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

                google.maps.event.addListener(marker, 'click', function() {
                  // If there is already an info window, close it.
                  if(activeWindow != null) {
                    activeWindow.close();
                  }
                  infowindow.open(map,marker);
                  activeWindow = infowindow;
                });
              }

              map.fitBounds(bounds);
        });
      });
    });
  }
});

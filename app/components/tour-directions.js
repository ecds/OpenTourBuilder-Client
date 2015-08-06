import Ember from 'ember';
import DS from 'ember-data';
/* global google */
/* global Cookies */
/* global drawMap */

export default Ember.Component.extend({

  didInsertElement: function() {
    Ember.$(document).on('change','.ember-selectize',function(evt){
          var $this = Ember.$(evt.target);
          var selectedMode = $this.val();
          if(!selectedMode){
            selectedMode = "WALKING";
          }
          Cookies.set('selectedMode', selectedMode);
          $this.siblings('.selectize-control').children('.selectize-input').html(selectedMode);
        });
  },
  actions:{
    showDirections: function(stop){
          drawMap(stop);
    },

    goToMapItem: function(slug, target_class) {
        var $container = Ember.$("#"+slug+" .wrapper");
        var target = "#"+slug+" ."+target_class;
        var $elem = Ember.$(target);

        $container.animate({scrollLeft:$elem.position().left},500);
    },

  }
});

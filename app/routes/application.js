// app/routes/index.js
import Ember from "ember";
import DS from "ember-data";
/* global google */
/* global Cookies */
/* global drawMap */

export default Ember.Route.extend({
  actions: {
       goToLink: function(slug) {
            var anchor = "#"+slug;
            var $elem = Ember.$(anchor);
            var index = $elem.index();
            var href = location.href.replace(location.search,'?stop='+index);

            window.history.pushState({},"", href);

            Ember.$('body').animate({scrollTop:$elem.offset().top-80},500);
       },

       openStopMap: function(stop) {

           var slug = stop.get('slug'),
               elem = "#"+slug,
               $elem = Ember.$(elem),
               $directions = Ember.$(elem+" .direction-list .adp");

           $elem.toggleClass('show-directions');

           if($directions.length<=0){
             drawMap(stop);
           }
       }
   }
});

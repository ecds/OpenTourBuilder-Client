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
           console.log(stop)
           var anchor = "#"+stop.get("slug");
           var $elem = Ember.$(anchor);
           $elem.toggleClass('show-directions');
           drawMap(stop);
       }
   }
});

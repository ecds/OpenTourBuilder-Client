// app/routes/index.js
import Ember from "ember";
import DS from "ember-data";
/* global drawMap */

export default Ember.Route.extend({
  actions: {
       goToLink: function(tour_slug, slug) {
            var anchor = "#"+slug;
            var $elem = Ember.$(anchor);
            var index = $elem.index();
            var href = location.href;

            var $info_page_container = Ember.$('.content-wrap>.tour-info'),
                is_info_page = $info_page_container.length>0;

            if(is_info_page){
              this.transitionTo('tour',tour_slug, {queryParams:{stop:index}});
              var $window = Ember.$('window');
              $window.scrollTop($window.scrollTop()+1);
              Ember.$("#open-button").click();
            }
            // else{

              window.history.pushState({},"", href);

              Ember.$("#open-button").click();
              Ember.run.later(this, function() {
                  Ember.$('html,body').animate({scrollTop:$elem.offset().top-80});
              }, 1000);
              Ember.run.later(this, function() {
                  Ember.$('.tour-section').addClass('stuck').addClass('stuck-bottom');
                  Ember.$(anchor).removeClass('stuck').removeClass('stuck-bottom');
                  window.history.pushState({},"", tour_slug+"?stop="+index);
              }, 1500);

            // }
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
       },

       search: function(){
        var searchTerm = Ember.$("input.tour-search").val();
        this.transitionTo('search', searchTerm);
       }
   }
});

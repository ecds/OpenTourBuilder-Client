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
            var href = location.href;

            var $info_page_container = Ember.$('.content-wrap>.tour-info'),
                is_info_page = $info_page_container.length>0;

            if(is_info_page){
              var tour_slug = location.pathname.split('/option')[0].replace('/','');
              this.transitionTo('tour',tour_slug, {queryParams:{stop:index}});
              var $window = Ember.$('window');
              $window.scrollTop($window.scrollTop()+1);
            }
            else{
              if(location.search){
                href = href.replace(location.search,'?stop='+index);
              }
              else{
                href = href +'?stop='+index;
              }
              window.history.pushState({},"", href);

              Ember.$('body').animate({scrollTop:$elem.offset().top-80},500);
            }
       },

       openStopMap: function(stop) {

           var slug = stop.get('id'),
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

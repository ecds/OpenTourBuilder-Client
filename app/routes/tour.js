import Ember from 'ember';
/* global menuInit */


export default Ember.Route.extend({
  model: function(params){
    // If/when we change to Rails we will need to change this to the following
    // return this.store.find('tourDetail', {slug: params.slug});
    return this.store.find('tourDetail', params.slug);
  },

  actions: {
    didTransition: function() {

      var stop_number = this.controller.get('stop');

      Ember.run.scheduleOnce('afterRender', function() {
        menuInit();

        if(parseInt(stop_number)){
          var elem = Ember.$('.tour-section');

          if(elem[parseInt(stop_number)]){
            // elem = "[data-stop='"+stop_number+"']"
            elem = ".tour-stop:eq("+stop_number+")";
            console.log(elem)
            Ember.run.later(this, function() {
            Ember.$('html,body').animate({scrollTop:Ember.$(elem).offset().top-80},0);
          },2000);
          }
        }
        else{
          Ember.$('html,body').scrollTop(0);
        }

      });
    },
    toggleList: function(){
      Ember.$(".stop-list").toggle();
      Ember.$("button#stop-list-button").addClass("active").prop('disabled', true);
      Ember.$("button#map-overview-button").removeClass("active").prop('disabled', false);
      Ember.$(".overview-map").toggle();
    }
  }

});

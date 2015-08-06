import Ember from 'ember';
// /* global google */
// /* global Cookies */
// /* global Swiper */

export default Ember.Route.extend({
  model: function(params){
    return this.store.find('tourStopDetail', params.id);
  }
});

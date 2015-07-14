import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return this.store.find('tourInfoDetail', params.id);
  },
  renderTemplate: function() {
    this.render('tour-info',{outlet: 'info'});
  }
});

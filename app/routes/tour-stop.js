import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		return this.store.find('tourStopDetail', params.id);
	},
	afterModel: function(model) {
		model.reload();
	}

});

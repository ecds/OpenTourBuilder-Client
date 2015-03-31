import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		console.log(params.slug);
		return this.store.find('tour', params.slug);
	},
	afterModel: function(model){
		console.log('hello');
		model.reload();
	}
});

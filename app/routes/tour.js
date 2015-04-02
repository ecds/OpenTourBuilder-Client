import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		// If/when we change to Rails we will need to change this to the following
		// return this.store.find('tourDetail', {slug: params.slug});
		return this.store.find('tourDetail', params.slug);
	},

});

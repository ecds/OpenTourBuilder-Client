import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
	    return this.store.find('tourStopDetail', { search: params.searchTerm});
	},

	renderTemplate: function() {
    	this.render('search',{outlet: 'search'});
  	},
});

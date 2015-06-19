import Ember from 'ember';

export default Ember.Component.extend({


    modal: function() {
    		var label = this.image.label;
			Ember.run.scheduleOnce('afterRender', function() {		
				Ember.$(function() {
					Ember.$("#"+label).fancybox({
						helpers: {
							title: {
								type: 'float'
							}
						}
					});
					
			});
    });
	}.property()
});

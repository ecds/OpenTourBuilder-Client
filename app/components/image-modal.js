import Ember from 'ember';

export default Ember.Component.extend({


    modal: function() {
			Ember.run.scheduleOnce('afterRender', function() {		
				Ember.$(function() {

					Ember.$(".fancybox").fancybox({

        				beforeLoad: function() {
            				var el, id = Ember.$(this.element).data('title-id');

			            	if (id) {
			                	el = Ember.$('#' + id);
            
            			    if (el.length) {
			                    this.title = el.html();
            			    }
            			}
        			}
    			});
			});			
		});

	}.property()
});

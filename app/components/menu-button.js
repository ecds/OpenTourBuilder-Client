import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function() {
		Ember.$(document).ready(function(){
		  Ember.$(".dropdown-button").click(function() {
		    Ember.$(".dropdown-menu").toggleClass("show-menu");
		    Ember.$(".dropdown-menu > li").click(function(){
		      Ember.$(".dropdown-menu").removeClass("show-menu");
		    });
		    Ember.$(".dropdown-menu.dropdown-select > li").click(function() {
		      Ember.$(".dropdown-button").html(Ember.$(this).html());
		    });
		  });
		});

	}
});

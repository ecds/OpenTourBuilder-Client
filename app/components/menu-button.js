import Ember from 'ember';
/* global jQuery */

export default Ember.Component.extend({
	didInsertElement: function() {
		// Ember.$(document).ready(function(){
		//   Ember.$(".dropdown-button").click(function() {
		//     Ember.$(".dropdown-menu").toggleClass("show-menu");
		//     Ember.$(".dropdown-menu > li").click(function(){
		//       Ember.$(".dropdown-menu").removeClass("show-menu");
		//     });
		//     Ember.$(".dropdown-menu.dropdown-select > li").click(function() {
		//       Ember.$(".dropdown-button").html(Ember.$(this).html());
		//     });
		//   });
		// });
		Ember.$('.js-accordion-trigger').bind('click', function(e){
  jQuery(this).parent().find('.submenu').slideToggle('fast');  // apply the toggle to the ul
  jQuery(this).parent().toggleClass('is-expanded');
  e.preventDefault();
});

	}
});

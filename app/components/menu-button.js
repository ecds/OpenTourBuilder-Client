import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function() {
		$(document).ready(function(){
		  $(".dropdown-button").click(function() {
		    $(".dropdown-menu").toggleClass("show-menu");
		    $(".dropdown-menu > li").click(function(){
		      $(".dropdown-menu").removeClass("show-menu");
		    });
		    $(".dropdown-menu.dropdown-select > li").click(function() {
		      $(".dropdown-button").html($(this).html());
		    });
		  });
		});

	}
});

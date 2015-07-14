import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {

      var parallaxImages = Ember.$(".parallax-window");

      if (Ember.$( ".parallax-window").length) {
        Ember.$.each(parallaxImages, function(index, parallaxImage) {
          parallax(parallaxImage);
        });
      }

      Ember.$(window).off('resize');
      Ember.$(window).on('resize',function(){
        Ember.$.each(parallaxImages, function(index, parallaxImage) {
          parallax(parallaxImage);
        });
      });

      if (parallaxImages.length) {
        Ember.$(window).off('scroll');
        Ember.$(window).on('scroll',function(e) {
          window.requestAnimationFrame(function(){
            Ember.$.each(parallaxImages, function(index, parallaxImage) {
              parallax(parallaxImage);
            });
          });
        });
      }

      function parallax(parallaxImage){
        if( Ember.$(".parallax-window").length > 0 ) {
          var plxBackground = Ember.$(parallaxImage).children(".parallax-background");
          var plxWindow = Ember.$(parallaxImage);

          var plxWindowTopToPageTop = Ember.$(plxWindow).offset().top;
          var windowTopToPageTop = Ember.$(window).scrollTop();
          var plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;

          var plxSpeed = 0.45;
          var top_pos = Math.round(plxWindowTopToWindowTop * plxSpeed, 1);
          plxBackground.css('top', -top_pos  + 'px');
        }
      }
  }
});


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

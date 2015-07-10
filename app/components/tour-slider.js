import Ember from 'ember';
/* global Swiper */

export default Ember.Component.extend({
  didInsertElement: function() {
    var _this = this;
    //TODO: figure out a way to run the slider code after the last image has been inserted
    Ember.run.later(function() {
      var element = "#" + _this.elementId + " .swiper-container";
      new Swiper(element, {
            pagination: element + ' .swiper-pagination',
            nextButton: element + ' .swiper-button-next',
            prevButton: element + ' .swiper-button-prev',
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 30,
            loop: true,
            //setWrapperSize: true
      });
    },1000);
  }
});

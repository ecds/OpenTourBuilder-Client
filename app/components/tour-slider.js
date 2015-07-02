import Ember from 'ember';
/* global Swiper */

export default Ember.Component.extend({
  didInsertElement: function() {
    var _this = this;
    var element = "#" + _this.element.id + " .swiper-container";
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
  }
});

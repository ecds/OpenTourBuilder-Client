import Ember from 'ember';
/* global Cookies */

export default Ember.Controller.extend({
  isLoggedIn: function(){
    return Cookies.get('isLoggedIn');
    //console.log(Cookies.get('isLoggedIn'));
  }.property('isLoggedIn')
});

import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('tour', {path: '/:slug'}, function(){
    this.resource('tour_stop', {path: '/:id'});
    this.resource('tour_info', {path: '/option/:id'});
  });
});

export default Router;

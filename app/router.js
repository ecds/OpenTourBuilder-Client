import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('tour', {path: '/tour/:slug'});
  this.resource('tour_stop', {path: '/tour/:tour_slug/:id'});
});

export default Router;

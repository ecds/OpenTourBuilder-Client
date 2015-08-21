import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('image', {path: '/image/:id'});

  this.resource('tour', {path: '/:slug'}, function(){
    this.resource('tour_stop', {path: '/:id', queryParams: ['anchor']});
    this.resource('tour_info', {path: '/option/:id'});
    this.resource('search', {path: '/search/:searchTerm'});
  });

});

export default Router;

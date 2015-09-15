import Ember from 'ember';

var globals = Ember.Object.extend({
  preferredMode: ''
});

export default {
  name: "Globals",

  initialize: function(container, application) {
    container.typeInjection('component', 'store', 'store:main');
    application.register('global:variables', globals, {singleton: true});
    application.inject('route', 'globals', 'global:variables');
  }
};

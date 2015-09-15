// app/routes/index.js
import Ember from "ember";
//import DS from "ember-data";

export default Ember.Route.extend({
   model: function() {
     if (this.controllerFor("application").get("isLoggedIn")) {
       return this.store.find('tourList');
     }
     else {
       return this.store.query('tourList', {published: 'True'});
     }
  }
});

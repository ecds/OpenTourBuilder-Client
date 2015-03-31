// app/routes/index.js
import Ember from "ember";
//import DS from "ember-data";

export default Ember.Route.extend({
   model: function() {
    return this.store.find('tour');
  }
});
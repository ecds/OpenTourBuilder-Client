import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  slug: DS.attr('string'),
  stop_ids: DS.hasMany('tourStopDetail', {async: true})
});
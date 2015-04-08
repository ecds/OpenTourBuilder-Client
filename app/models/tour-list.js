import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  slug: DS.attr('string'),
  stop_ids: DS.hasMany('tourStopDetail', {async: true}),
  info_ids: DS.hasMany('tourInfoDetail', {async: true}),
  published: DS.attr('boolean'),
  geospatial: DS.attr('boolean')
});
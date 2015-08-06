import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  slug: DS.attr('string'),
  stop_ids: DS.hasMany('tourStopDetail', {async: true}),
  info_ids: DS.hasMany('tourInfoDetail', {async: true}),
  published: DS.attr('boolean'),
  geospatial: DS.attr('boolean'),
  phone_splash: DS.attr('string'),
  tablet_splash: DS.attr('string'),
  desktop_splash: DS.attr('string'),
  slug_class: DS.attr('string'),
  phone_default: DS.attr('string'),
  tablet_default: DS.attr('string'),
  desktop_default: DS.attr('string')
});
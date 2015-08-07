import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  position: DS.attr('number'),
  tour: DS.belongsTo('tourDetail'),
  icon: DS.attr('string')
});

import DS from 'ember-data';

export default DS.Model.extend({
 	name: DS.attr('string'),
	tour: DS.belongsTo('tourDetail'),
	map_image: DS.attr('string'),
	position: DS.attr('number'),
});
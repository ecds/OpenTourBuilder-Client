import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	label: DS.attr('string'),
	href: DS.attr('string'),
	original_image: DS.attr('string'),
	size: DS.attr('string'),
	phone_thumb: DS.attr('string'),
	phone_full: DS.attr('string'),
	tablet_thumb: DS.attr('string'),
	tablet_full: DS.attr('string'),
	desktop_thumb: DS.attr('string'),
	desktop_full: DS.attr('string'),
	caption: DS.attr('string'),
	placeholer: DS.attr('string')
});

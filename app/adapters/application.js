import DS from "ember-data";

export default DS.RESTAdapter.extend({
	host: 'http://172.16.83.129:8000',
	namespace: 'v1',
	suffix: '&format=json',
	query_marker: '?',

	buildURL: function(record, suffix, query_marker) {
      var s = this._super(record, query_marker, suffix);
      return s + this.get('query_marker') + this.get('suffix');
    }
});
import Ember from 'ember';

export function truncateText(params/*, hash*/) {
	var theString = params[0].substring(0,100)+"...";
    return theString;
}

export default Ember.Helper.helper(truncateText);

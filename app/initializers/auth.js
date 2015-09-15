import ENV from "../config/environment";
export default {
  name:       'auth',
  before:      'django-rest-auth',
  initialize: function(/*container, application*/){
    window.ENV = ENV;
  }
};

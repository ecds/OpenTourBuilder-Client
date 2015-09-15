/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'open-tour-builder-ember',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.API_HOST = 'http://api-campustour.ecdsweb.org';

  }

  if (environment === 'staging') {
    ENV.APP.API_HOST = 'http://api-campustour.ecdsweb.org';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

    ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-eval' https://cdn.mxpnl.com http://*.googleapis.com https://*.googleapis.com http://maps.gstatic.com https://maps.gstatic.com",
    'font-src': "'self' http://fonts.gstatic.com https://fonts.gstatic.com http://maxcdn.bootstrapcdn.com",
    'connect-src': "'self' http://otb-api.dev.ecdsweb.org http://192.168.200.128:8000 http://maps.gstatic.com https://maps.gstatic.com http://api-campustour.ecdsweb.org",
    'img-src': "*",
    'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com https://fonts.googleapis.com http://maps.gstatic.com https://maps.gstatic.com http://maxcdn.bootstrapcdn.com",
    'media-src': "'self'",
    'frame-src': "'self' https://www.youtube.com"
  };



  if (environment === 'production') {
    ENV.APP.API_HOST = '$api-host';
  }

  ENV['simple-auth'] = {
    authorizer: 'authorizer:django-rest',
    authenticator: 'authenticator:django-rest',
    serverTokenEndpoint: ENV.APP.API_HOST+'/v1/api-token-auth/',
    crossOriginWhitelist: [ENV.APP.API_HOST]
  };

  return ENV;
};

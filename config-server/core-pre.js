'use strict';

const config = {
  http: {
    apiUrls: {
      core: 'https://core-service-pre.qa.procurenetworks.com/api',
      inventory: 'https://inv-pre.qa.procurenetworks.com/api/v1'
    },
    auth0: {
      domain: 'core-demo.auth0.com',
      clientId: '-',
      clientSecret: '-',
      callbackUri: 'https://core-pre.qa.procurenetworks.com/callback'
    }
  }
};

module.exports = config;

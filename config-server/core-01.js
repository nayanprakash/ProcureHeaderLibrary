'use strict';

const config = {
  http: {
    apiUrls: {
      core: 'https://core-service-01.qa.procurenetworks.com/api',
      inventory: 'https://inv-04.qa.procurenetworks.com/api/v1'
    },
    auth0: {
      domain: 'core-demo.auth0.com',
      clientId: '-',
      clientSecret: '-',
      callbackUri: 'https://core-01.qa.procurenetworks.com/callback'
    }
  }
};

module.exports = config;

'use strict';

const config = {
  http: {
    apiUrls: {
      core: 'https://core-service.procurenetworks.com/api',
      inventory: 'https://inventory.procurenetworks.com/api/v1'
    },
    auth0: {
      domain: 'core-demo.auth0.com',
      clientId: '-',
      clientSecret: '-',
      callbackUri: 'https://core.procurenetworks.com/callback'
    }
  }
};

module.exports = config;

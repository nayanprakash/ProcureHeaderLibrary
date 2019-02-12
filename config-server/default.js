'use strict';

const path = require('path');

/**
 * @typedef {Object} PnCoreConfig
 * @property {string} env
 * @property {HttpServerConfig} http
 */

/**
 * @type {PnCoreConfig}
 */
const config = {
  env: '',
  http: {
    apiUrls: {
      core: 'http://localhost:8081/api',
      inventory: 'http://localhost:8082/api/v1'
    },
    auth0: {
      domain: 'core-demo.auth0.com',
      clientId: '6boi5vCiTh5TeK11b0RQQcQTlD007Lzq',
      clientSecret: 'Ve8HkN9RgXp2QdZIu_qJO06FrIYc2ekG2SYe2ci_xL5NmQQTl9P0U-fwLgFAIFX_',
      callbackUri: 'http://localhost:3000/callback'
    },
    context: '',
    ip: '0.0.0.0',
    port: 8080,
    timeout: 1000 * 60 * 2, // 2 minutes
    static: {
      opts: {
        defer: false, // must be false to work with koa-ejs
        index: false
      },
      root: path.resolve(__dirname, '../build')
    }
  }
};

module.exports = config;

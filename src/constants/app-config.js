/*
 * @file: app-config.js
 * @description: It Contain app configration keys and environment path's.
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 */

const { apiUrls = {}, auth0 = {} } = window.$pnConfig || {};

const auth0Domain = auth0.domain || 'core-demo.auth0.com';

export const environment = {
  CORE_API_URL: apiUrls.core || 'https://core-service-01.qa.procurenetworks.com/api',
  INVENTORY_API_URL: apiUrls.inventory || 'https://inv-04.qa.procurenetworks.com/api/v1',
  AUTH_TOKEN_API_URL: `https://${auth0Domain}/oauth/token`
};

export const auth = {
  DOMAIN: auth0Domain,
  CLIENT_ID: auth0.clientId || '6boi5vCiTh5TeK11b0RQQcQTlD007Lzq',
  CLIENT_SECRET:
    auth0.clientSecret || 'Ve8HkN9RgXp2QdZIu_qJO06FrIYc2ekG2SYe2ci_xL5NmQQTl9P0U-fwLgFAIFX_',
  SCOPE: 'openid',
  GRANT_TYPE: 'password',
  // CALLBACK_URI: auth0.callbackUri || 'http://localhost:3000/callback',
  // CALLBACK_URI: auth0.callbackUri || 'http://stagingsdei.com:4193/callback',
  CALLBACK_URI: auth0.callbackUri || 'https://core-01.qa.procurenetworks.com/callback'
};

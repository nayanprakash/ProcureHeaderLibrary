/*
 * @file: Connection.js
 * @description: Connection file for the application
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 * */

import { environment as PATH } from './app-config';

const httpUrl = PATH.CORE_API_URL,
  siteApiUrl = PATH.INVENTORY_API_URL;

class Connection {
  static getResturl(url) {
    return `${httpUrl}/${url}`;
  }
  static getBaseUrl() {
    return httpUrl;
  }
  static getSiteUrl(url) {
    return `${siteApiUrl}/${url}`;
  }
  static getAuthUrl() {
    return PATH.AUTH_TOKEN_API_URL;
  }
}

export default Connection;

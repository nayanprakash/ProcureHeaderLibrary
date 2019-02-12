/*
 * @file: RestClient.js
 * @description: Connection file for the application
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 * */

import Connection from '../constants/Connection';
import querystring from 'querystring';
import axios from 'axios';

let config = {
  headers: { accept: 'application/json' }
};

class RestClient {
  /*************** POST Method ***********/
  static post(url, params = {}, token = null) {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return new Promise(function(fulfill, reject) {
      axios
        .post(Connection.getResturl(url), params, config)
        .then(function(response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
  /*************** Auth0 login method ***********/
  static authLogin(params) {
    return new Promise(function(fulfill, reject) {
      axios
        .post(Connection.getAuthUrl(), params, config)
        .then(function(response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  /*************** PUT Method ***********/
  static put(url, params = {}, token = null) {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return new Promise(function(fulfill, reject) {
      axios
        .put(Connection.getResturl(url), params, config)
        .then(function(response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
  /*************** GET Method ***********/
  static get(url, params = {}, token = null) {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    let query = querystring.stringify(params);
    return new Promise(function(fulfill, reject) {
      axios
        .get(Connection.getResturl(url) + '?' + query, config)
        .then(function(response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
  /*************** DELETE Method ***********/
  static delete(url, token = null) {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return new Promise(function(fulfill, reject) {
      axios
        .delete(Connection.getResturl(url), config)
        .then(function(response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  /*************** Form-Data Method ***********/
  static postFormData(url, params, token = '') {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'multipart/form-data';
    return new Promise(function(fulfill, reject) {
      var body = new FormData();
      body.append('attachment', params);

      axios
        .post(Connection.getResturl(url), body, config)

        .then(function(response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  /*************** GET Sites Method ***********/
  static getSites(url, token = null) {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return new Promise(function(fulfill, reject) {
      axios
        .get(Connection.getSiteUrl(url), config)
        .then(function(response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function(error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
}

export default RestClient;

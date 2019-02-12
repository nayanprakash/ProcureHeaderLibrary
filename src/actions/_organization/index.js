/*
 * @file: index.js
 * @description: It Contain organization Related Action Creators.
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 */

import RestClient from '../../utilities/RestClient';
import message from '../../constants/messages';
import querystring from 'querystring';
import * as TYPE from '../../constants/action-types';
// Thunk Action Creators For Api

const get_organizations = ({ data }) => ({ type: TYPE.GET_ORGANIZATIONS, data });
const delete_organizations = id => ({ type: TYPE.DELETE_ORGANIZATIONS, id });
export const checked = data => ({ type: TYPE.ORGANIZATION_CHECKED, data });

/****** action creator for get Organizations ********/
export const getOrganizations = (params, cb) => {
  return dispatch => {
    RestClient.get('tenants', '', params.token)
      .then(result => {
        if (result.status === 200) {
          dispatch(get_organizations(result.data));
          cb({ status: true });
        } else {
          cb({ status: false });
        }
      })
      .catch(() => {
        cb({ status: false });
      });
  };
};

/****** action creator for get Organizations By Id ********/
export const getOrganizationsById = (params, cb) => {
  return () => {
    RestClient.get(`tenants/${params.id}`, '', params.token)
      .then(result => {
        if (result.status === 200) {
          let res = {
            status: true,
            ...result
          };
          cb(res);
        } else {
          cb({ status: false });
        }
      })
      .catch(() => {
        cb({ status: false });
      });
  };
};

/****** action creator for delete Organization by Id  ********/
export const deleteOrganization = (params, cb) => {
  return dispatch => {
    RestClient.delete(`tenants/${params._id}`, params.token)
      .then(result => {
        if (result.status === 200) {
          dispatch(delete_organizations(params._id));
          cb({ status: true, message: message.delete('Organization') });
        } else {
          cb({ status: false, message: result.message });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

/****** action creator for Add Organization ********/
export const addOrganizations = (params, cb) => {
  const token = params.token,
    file = params.file;
  delete params.token;
  delete params.file;

  return () => {
    let query = querystring.stringify(params);
    RestClient.postFormData(`tenants?${query}`, file, token)
      .then(result => {
        if (result.status === 200) {
          cb({ status: true, message: message.added('Organization') });
        } else {
          cb({ status: false, message: result.message });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

/****** action creator for Edit Organization ********/
export const editOrganizations = (params, cb) => {
  const token = params.token,
    file = params.file,
    id = params.id;
  delete params.token;
  delete params.file;
  delete params.id;
  return () => {
    let query = querystring.stringify(params);
    RestClient.postFormData(`tenants/${id}?${query}`, file, token)
      .then(result => {
        if (result.status === 200) {
          cb({ status: true, message: message.updated('Organization') });
        } else {
          cb({ status: false, message: result.message });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

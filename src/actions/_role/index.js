/*
 * @file: index.js
 * @description: It Contain Roles Related Action Creators.
 * @date: 30.07.2018
 * @author: Jasdeep Singh
 */

import RestClient from '../../utilities/RestClient';
import message from '../../constants/messages';
import * as TYPE from '../../constants/action-types';
//Action Creator For Reducers

const get_roles = data => ({ type: TYPE.GET_ROLES, data });
const delete_roles = data => ({ type: TYPE.DELETE_ROLES, data });
export const checked = data => ({ type: TYPE.ROLE_CHECKED, data });

/****** action creator for get roles ********/
export const getRoles = (params, cb) => {
  return dispatch => {
    RestClient.get('roles', '', params.token)
      .then(result => {
        if (result.status === 200) {
          dispatch(get_roles(result.data));
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

/****** action creator for get roles by Id ********/
export const getRoleById = (params, cb) => {
  return () => {
    RestClient.get(`roles/${params.id}`, '', params.token)
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

/****** action get roles by Organizations Id ********/
export const getRolesByOrganizationsById = (params, cb) => {
  return () => {
    RestClient.get(`organizations/${params.id}/roles`, '', params.token)
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

/****** action creator for delete Role by Id  ********/
export const deleteRole = (params, cb) => {
  return dispatch => {
    RestClient.delete(`roles/${params._id}`, params.token)
      .then(result => {
        if (result.status === 200) {
          dispatch(delete_roles({ id: params._id }));
          cb({ status: true, message: message.delete('Role') });
        } else {
          cb({ status: false, message: result.message });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

/****** action creator for get roles permissions ********/
export const getRolesPermissions = (params, cb) => {
  return () => {
    RestClient.get('permissions', '', params.token)
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
        cb({ status: false, message: message.commonError });
      });
  };
};

/****** action creator for Add roles ********/
export const addRole = (params, cb) => {
  return () => {
    const token = params.token;
    delete params.token;
    RestClient.post('roles', params, token)
      .then(result => {
        if (result.status === 200) {
          cb({ status: true, message: message.added('Role') });
        } else {
          cb({ status: false, message: result.message });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

/****** action creator for update roles ********/
export const updateRole = (params, cb) => {
  return () => {
    const token = params.token,
      id = params.id;
    delete params.token;
    delete params.id;
    RestClient.put(`roles/${id}`, params, token)
      .then(result => {
        if (result.status === 200) {
          cb({ status: true, message: message.updated('Role') });
        } else {
          cb({ status: false, message: result.message });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

/*
 * @file: index.js
 * @description: It Contain User Account Related Action Creators.
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 */

import RestClient from '../../utilities/RestClient';
import message from '../../constants/messages';
import * as TYPE from '../../constants/action-types';
import querystring from 'querystring';
//Action Creator For Reducers

const login_Success = data => ({ type: TYPE.LOGIN_SUCCESS, data });
const get_users = data => ({ type: TYPE.GET_USERS, data });
const delete_users = data => ({ type: TYPE.DELETE_USERS, data });
const remember_me = data => ({ type: TYPE.REMEMBER_ME, data });
const log_out = () => ({ type: TYPE.LOG_OUT });
export const update_profile = data => ({ type: TYPE.UPDATE_PROFILE, data });
export const checked = data => ({ type: TYPE.USER_CHECKED, data });

// Thunk Action Creators For Api

/****** action creator for authenticate Auth0 ********/
export const login = (params, cb) => {
  const remember = params.remember;
  delete params.remember;
  return dispatch => {
    RestClient.authLogin(params)
      .then(result => {
        if (result.status === 200) {
          if (remember) {
            dispatch(remember_me({ email: params.username, password: params.password }));
          } else {
            dispatch(remember_me({ email: '', password: '' }));
          }
          let res = {
            status: true,
            ...result.data
          };
          cb(res);
        } else {
          cb({
            status: false,
            message:
              result.error_description === 'Unauthorized'
                ? message.authError
                : result.error_description
          });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

/****** action creator for authenticate Auth0 ********/
export const authenticate = (params, cb) => {
  return () => {
    RestClient.get('authenticate', params)
      .then(result => {
        if (result.status === 200) {
          let res = {
            status: true,
            token: result.data.jwtToken
          };
          cb(res);
        } else {
          cb({ status: false, message: result.message });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

/****** action creator for validate Token ********/
export const validateToken = (params, cb) => {
  return dispatch => {
    RestClient.post(`validate-token?token=${params.token}`)
      .then(result => {
        if (result.status === 200) {
          dispatch(login_Success({ ...result.data, ...params }));
          cb({ status: true, data: result.data });
        } else {
          cb({ status: false, message: result.message });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

/************* Forgot Password **************/
export const forgotPassword = (params, cb) => {
  const token = params.token;
  delete params.token;
  return () => {
    RestClient.post('reset-password', params, token)
      .then(result => {
        if (result.status === 200) {
          cb({ status: true, message: result.data });
        } else {
          cb({ status: false, message: result.message });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

/****** action creator for get users list ********/
export const getUsers = (params, cb) => {
  return dispatch => {
    RestClient.get('users', '', params.token)
      .then(result => {
        if (result.status === 200) {
          dispatch(get_users(result.data));
          cb({ status: true });
        } else {
          cb({ status: false, message: result.message });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

/****** action creator for get users by Id  ********/
export const getUserById = (params, cb) => {
  return () => {
    RestClient.get(`users/${params.id}`, '', params.token)
      .then(result => {
        if (result.status === 200) {
          let res = {
            status: true,
            ...result
          };
          cb(res);
        } else {
          cb({ status: false, message: result.message });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

/****** action creator for delete users by Id  ********/
export const deleteUser = (params, cb) => {
  return dispatch => {
    RestClient.delete(`users/${params._id}`, params.token)
      .then(result => {
        if (result.status === 200) {
          dispatch(delete_users({ id: params._id }));
          cb({ status: true, message: message.delete('User') });
        } else {
          cb({ status: false, message: result.message });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

/****** action creator for Add users ********/
export const addUser = (params, cb) => {
  const token = params.token,
    file = params.file;
  delete params.token;
  delete params.file;
  return () => {
    let query = querystring.stringify(params);
    RestClient.postFormData(`users?${query}`, file, token)
      .then(result => {
        if (result.status === 200) {
          cb({ status: true, message: message.added('User') });
        } else {
          cb({ status: false, message: result.message });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

/****** action creator for update users ********/
export const updateUser = (params, cb) => {
  const token = params.token,
    id = params._id,
    file = params.file;
  delete params.token;
  delete params._id;
  delete params.file;
  return dispatch => {
    let query = querystring.stringify(params);
    RestClient.postFormData(`users/${id}?${query}`, file, token)
      .then(result => {
        if (result.status === 200) {
          dispatch(update_profile(result.data));
          cb({ status: true, message: message.updated('User') });
        } else {
          cb({ status: false, message: result.message });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

/****** action creator for update users ********/
export const updateUserProfile = (params, cb) => {
  const token = params.token,
    file = params.file;
  delete params.token;
  delete params.file;
  return dispatch => {
    let query = querystring.stringify(params);
    RestClient.postFormData(`users/update-profile?${query}`, file, token)
      .then(result => {
        if (result.status === 200) {
          dispatch(update_profile(result.data));
          cb({ status: true, message: message.updated('Profile') });
        } else {
          cb({ status: false, message: result.message });
        }
      })
      .catch(() => {
        cb({ status: false, message: message.commonError });
      });
  };
};

/******** action creator to log user out of the application **********/
export const logOut = cb => {
  return dispatch => {
    dispatch(log_out());
    cb(true);
  };
};

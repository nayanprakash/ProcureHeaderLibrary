/*
 * @file: user.js
 * @description: Reducers and actions for store/manipulate user's  data
 * @date: 04.07.2018
 * @author: Jasdeep Singh
*/

import * as TYPE from '../../constants/action-types';

/******** Reducers ********/

const initialState = {
  loggedIn: false,
  rememberMe: {
    email: '',
    password: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.LOGIN_SUCCESS:
      return { ...state, ...{ loggedIn: true }, ...action.data };

    case TYPE.UPDATE_PROFILE:
      return { ...state, user_metadata: action.data.user_metadata, email: action.data.email };

    case TYPE.REMEMBER_ME:
      return { ...state, rememberMe: action.data };

    case TYPE.LOG_OUT:
      return { ...initialState, rememberMe: state.rememberMe };

    default:
      return state;
  }
};

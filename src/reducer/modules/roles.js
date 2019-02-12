/*
 * @file: roles.js
 * @description: Reducers and actions for store/manipulate roles  data
 * @date: 04.07.2018
 * @author: Jasdeep Singh
*/

import * as TYPE from '../../constants/action-types';

/******** Reducers ********/

export default function reducer(state = [], action) {
  switch (action.type) {
    case TYPE.GET_ROLES:
      return action.data;

    case TYPE.DELETE_ROLES: {
      let index = state.findIndex(val => val._id === action.data.id);
      state.splice(index, 1);
      return [...state];
    }

    case TYPE.ROLE_CHECKED: {
      let index = state.findIndex(val => val._id === action.data.id);
      let checkIndex = state.findIndex(val => val.checked && val.checked);
      if (checkIndex !== -1) {
        state[checkIndex] = { ...state[checkIndex], checked: false };
      }
      state[index] = { ...state[index], checked: true };
      return [...state];
    }

    case TYPE.LOG_OUT:
      return [];

    default:
      return state;
  }
}

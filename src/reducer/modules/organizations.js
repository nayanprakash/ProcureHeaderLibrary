/*
 * @file: organizations.js
 * @description: Reducers and actions for store/manipulate organizations  data
 * @date: 06.08.2018
 * @author: Jasdeep Singh
*/

import * as TYPE from '../../constants/action-types';

/******** Reducers ********/

export default function reducer(state = [], action) {
  switch (action.type) {
    case TYPE.GET_ORGANIZATIONS:
      return action.data;

    case TYPE.DELETE_ORGANIZATIONS: {
      let index = state.findIndex(val => val.id === action.id);
      state.splice(index, 1);
      return [...state];
    }

    case TYPE.ORGANIZATION_CHECKED: {
      let index = state.findIndex(val => val.id === action.data.id);
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

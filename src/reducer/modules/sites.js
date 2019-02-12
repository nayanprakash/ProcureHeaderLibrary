/*
 * @file: sites.js
 * @description: Reducers and actions for store/manipulate sites  data
 * @date: 04.07.2018
 * @author: Jasdeep Singh
*/

import * as TYPE from '../../constants/action-types';

/******** Reducers ********/

export default function reducer(state = [], action) {
  switch (action.type) {
    case TYPE.GET_SITES:
      return action.data;

    case TYPE.LOG_OUT:
      return [];

    default:
      return state;
  }
}

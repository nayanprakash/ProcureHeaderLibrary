/*
 * @file: index.js
 * @description: It Contain organization Related Action Creators.
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 */

import * as TYPE from '../../constants/action-types';
// Thunk Action Creators For Api

export const update_header_column = data => ({ type: TYPE.COLUMN_UPDATE, data });
export const toggleDropDown = data => ({ type: TYPE.COLUMN_UPDATE, data });

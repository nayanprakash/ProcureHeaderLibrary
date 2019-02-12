/*
 * @file: header-columns.js
 * @description: Reducers and actions for store/manipulate header columns  data
 * @date: 06.08.2018
 * @author: Jasdeep Singh
*/

import * as TYPE from '../../constants/action-types';
import { userTableColumns as adminUser } from '../../constants/header-columns';
import { organizationUserTableColumns as superAdminUser } from '../../constants/header-columns';
import { rolesTableColumns as adminRole } from '../../constants/header-columns';
import { superAdminRolesTableColumns as superAdminRole } from '../../constants/header-columns';
import { organizationsTableColumns as organization } from '../../constants/header-columns';

/******** Reducers ********/
const initialState = {
  adminUser,
  superAdminUser,
  adminRole,
  superAdminRole,
  organization,
  dropdownOpen: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.COLUMN_UPDATE:
      return { ...state, ...action.data };

    default:
      return { ...state };
  }
}

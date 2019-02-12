/*
 * @file: App.js
 * @description: Auth functions here
 * @date: 05.07.2018
 * @author: Jasdeep Singh
 * */

// import auth0 from 'auth0-js';
// import Auth0Lock from 'auth0-lock';
// import { auth as KEY } from '../constants/app-config';
//import { user_accounts, user_roles, multi_tenant, manage_organization } from '../constants';

//https://auth0.com/docs/libraries/lock/v11/configuration

/******** Get User from store  ***********/
export const User = store => {
  return store.getState().user;
};

/******** Routing authentication middleware ***********/
export const Auth = store => {
  return User(store).loggedIn;
};

/******** check permissions of login user ***********/
export const checkPermissions = (permissions, type) => {
  return permissions.includes(type);
};

/******** check permissions of login user ***********/
export const goToRoute = permissions => {
  // if (permissions.includes(user_accounts)) {
  //   return '/users';
  // } else if (permissions.includes(user_roles)) {
  //   return '/roles';
  // } else if (permissions.includes(multi_tenant)) {
  //   return '/organizations';
  // } else if (permissions.includes(manage_organization)) {
  //   return '/organization';
  // } else {
    return '/profile';
  // }
};

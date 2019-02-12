/*
 * @file: index.js
 * @description: It Contain sites Related Action Creators.
 * @date: 21.08.2018
 * @author: Jasdeep Singh
 */

import RestClient from '../../utilities/RestClient';
import message from '../../constants/messages';
import * as TYPE from '../../constants/action-types';

export const get_sites = data => ({ type: TYPE.GET_SITES, data });

//Action Creator For Reducers
/****** action creator for get sites ********/
export const getSites = (params, cb) => {
  return dispatch => {
    RestClient.getSites(`sites?organization_id=${params.organization_id}`, params.token)
      .then(result => {
        if (result.status === 200) {
          dispatch(get_sites(result.data.data));
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

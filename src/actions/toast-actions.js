/*
 * @file: toast-actions.js
 * @description: It Contain toasts Action function.
 * @date: 06.07.2018
 * @author: Jasdeep Singh
 */

import { push } from 'react-router-redux';
import { toast } from 'react-toastify';

export const toastAction = (status, message) => {
  if (status) {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000
    });
  } else {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000
    });
  }
};

export const toastErrorAction = (dispatch, message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 5000,
    onClose: () => {
      dispatch(push('/'));
    }
  });
  dispatch({ type: 'LOG_OUT' });
};

export const setErrorTime = context => {
  window.scrollTo(0, 0);
  setTimeout(() => {
    context.onDismiss();
  }, 30000);
};

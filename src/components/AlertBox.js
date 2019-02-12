/* 
      *                                                            *
    *****                                                        *****                             
      *                                                            *
        ==========================================================
        ==========                                      ==========
        ==========          Page for alert messages     ==========
        ==========                                      ==========
        ==========================================================
      *                                                            *
    *****                                                        *****   
      *                                                            *
*/

import React from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';

const AlertBox = ({ isShowingModal, status, type, _actionConfirmed, _onPress, message }) => {
  return (
    <div className="custom-bootbox">
      {isShowingModal && (
        <SweetAlert
          showCancel={type ? true : false}
          title={[
            <span key="title" className={type ? 'modal-title' : 'modal-title body-close-btn'}>
              {type}
            </span>,
            <button
              key="button"
              type="button"
              className="alertbox-close-button close"
              onClick={_onPress}
              aria-hidden="true"
            >
              ×
            </button>
          ]}
          allowEscape
          confirmBtnText={status === 'warning' ? (type ? 'Yes' : 'OK') : 'No'}
          cancelBtnText={'No'}
          confirmBtnBsStyle={status === false || status === 'warning' ? 'success' : 'danger'}
          onConfirm={status === 'warning' && type ? _actionConfirmed : _onPress}
          cancelBtnBsStyle="danger"
          onCancel={_onPress}
        >
          <div className={type ? 'modal-body' : 'modal-body modal-body-close'}>
            <div className="bootbox-body">{message}</div>
          </div>
        </SweetAlert>
      )}
    </div>
  );
};

AlertBox.propTypes = {
  isShowingModal: PropTypes.bool.isRequired,
  status: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  _actionConfirmed: PropTypes.func.isRequired,
  _onPress: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};
export default AlertBox;

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
import { Alert } from 'reactstrap';

const AlertMsg = ({ status, visible, _onDismiss, message }) => {
  return (
    <div>
      <Alert color={status ? 'success' : 'danger'} isOpen={visible} toggle={_onDismiss} fade={true}>
        {message}
      </Alert>
    </div>
  );
};

AlertMsg.propTypes = {
  status: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  _onDismiss: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

export default AlertMsg;

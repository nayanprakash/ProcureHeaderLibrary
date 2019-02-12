import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { Auth0 as Auth } from '../auth';
import Loader from '../components/ProcessingLoader';
import { authenticate, validateToken } from '../actions/user';
import '../containers/_styles/login.scss';
// import { toastAction } from '../actions/toast-actions';
// import { goToRoute } from '../auth';

const callback = props => {
  // Auth.parseHash((err, authResult) => {
  //   if (authResult && authResult.accessToken && authResult.idToken) {
  //     props.authenticate({ token: authResult.idToken }, res => {
  //       if (res.status) {
  //         props.validateToken({ token: res.token }, res => {
  //           if (res.status) {
  //             props.history.replace(goToRoute(res.data.permissions));
  //           }
  //         });
  //       }
  //     });
  //   } else if (err) {
  //     toastAction(false, 'Authentication failed, Please try again!');
  //     props.history.replace('/');
  //   }
  // });
  return (
    <div className="main-content">
      <div className="Login_wrap">
        <Loader isShowingLoader={true} />
        <div className="logo_icon">
          <img src={require('../assets/images/upload_btn_icon.png')} alt="" />
        </div>
        <h2>Logged in...</h2>
      </div>
    </div>
  );
};

callback.propTypes = {
  authenticate: PropTypes.func.isRequired,
  validateToken: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  authenticate: bindActionCreators(authenticate, dispatch),
  validateToken: bindActionCreators(validateToken, dispatch)
});

export default connect(null, mapDispatchToProps)(callback);

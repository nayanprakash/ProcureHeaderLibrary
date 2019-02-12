import React from 'react';
//import { Auth0 as Auth, Lock } from '../auth';
import './_styles/login.scss';

export default () => {
  /********* login authenticate user ************/
  const login = () => {
    //Lock.show();
    //Auth.authorize();
    //login
    // Lock.on('authenticated', function(authResult) {
    //   Lock.getUserInfo(authResult.accessToken, function(error, profile) {
    //     if (error) {
    //       // Handle error
    //       return;
    //     }
    //     console.log(authResult, profile);
    //   });
    // });
  };

  return (
    <div className="main-content">
      <div className="Login_wrap">
        <div className="logo_icon">
          <img src={require('../assets/images/upload_btn_icon.png')} alt="" />
        </div>
        <h2>Please login to continue</h2>
        <button className="btn" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

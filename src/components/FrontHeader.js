import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <header className="header white-bg">
      <div className="row" style={{ margin: 0 }}>
        <div className="navbar-header">
          <Link to="/" className="logo">
            <img alt="" className="big-logo" src={require('../assets/images/logo.png')} />
            <img alt="" className="mobile-logo" src={require('../assets/images/mobile_logo.png')} />
          </Link>
        </div>
      </div>
    </header>
  );
};

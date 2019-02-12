import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import {
  Navbar,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse
} from 'reactstrap';
import { logOut } from '../actions/user';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }
  /********* Toggle tab navigation on responsive **************/
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  /********* active tab navigation class **************/
  active = path => {
    const { location } = this.props;
    if (location.pathname.includes(`/${path}/`)) {
      return 'active';
    } else {
      return '';
    }
  };
  /****** Got to profile *********/
  profile() {
    this.setState({
      isOpen: !this.state.isOpen
    });
    this.props.history.push('/profile');
  }
  /********* Logout user **************/
  logout = () => {
    this.props.logOut(res => {
      if (res) {
        window.location.href = '/';
      }
    });
  };
  render() {
    const { user, location } = this.props;
    return (
      <div className="main_header">
        <Navbar expand="md">
          <NavbarBrand href="/users">
            <img src={require('../assets/images/logo.png')} alt="" className="Big-logo" />
            <img
              src={require('../assets/images/upload_btn_icon.png')}
              alt=""
              className="Mobile-logo"
            />
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar />
          <div className="right_nav_wrap">
            <Nav className="ml-auto right_nav" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <span className="Menu_icon">
                    <img src={user.user_metadata.photo_url} alt="" />
                  </span>{' '}
                  <span className="Username-btn">{user.user_metadata.first_name}</span>
                </DropdownToggle>
                <DropdownMenu right className="text-center">
                  <DropdownItem
                    onClick={() => this.profile()}
                    className={location.pathname.includes('/profile') ? 'text-center log-user' : ''}
                  >
                    <p className="dropdown-Icon">
                      <i className="fa fa-suitcase" aria-hidden="true" />
                    </p>
                    <p className="dropdown-Menu">Profile</p>
                  </DropdownItem>
                  <DropdownItem
                    className={
                      !location.pathname.includes('/profile') ? 'text-center log-user' : ''
                    }
                    onClick={() => this.logout()}
                  >
                    <p className="dropdown-Icon">
                      <i className="fa fa-key" aria-hidden="true" />
                    </p>
                    <p className="dropdown-Text">Sign Out</p>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </div>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logOut: bindActionCreators(logOut, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

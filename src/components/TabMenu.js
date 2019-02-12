import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { checkPermissions } from '../auth';
import { user_accounts, user_roles, multi_tenant, manage_organization } from '../constants';

class TabMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'users'
    };
    this.activeTab = this.activeTab.bind(this);
  }
  /****** Route url according to type of tab *********/
  toggleTab(tab) {
    const { history } = this.props;
    history.push(`/${tab}`);
  }
  /************** Active tab **************/
  activeTab(tab) {
    const { location } = this.props;
    if (location.pathname.includes(tab)) {
      return 'active';
    }
  }

  render() {
    const { user, location } = this.props;
    return location.pathname.includes('/profile') ? (
      <Nav tabs className="Custom-Tab" />
    ) : (
      <Nav tabs className="Custom-Tab">
        {checkPermissions(user.permissions, user_accounts) && (
          <NavItem>
            <NavLink className={this.activeTab('users')} onClick={() => this.toggleTab('users')}>
              Users
            </NavLink>
          </NavItem>
        )}
        {checkPermissions(user.permissions, user_roles) && (
          <NavItem>
            <NavLink className={this.activeTab('roles')} onClick={() => this.toggleTab('roles')}>
              Roles
            </NavLink>
          </NavItem>
        )}
        {checkPermissions(user.permissions, manage_organization) &&
          !checkPermissions(user.permissions, multi_tenant) && (
            <NavItem>
              <NavLink
                className={this.activeTab('manage-organization')}
                onClick={() => this.toggleTab('manage-organization')}
              >
                Organization
              </NavLink>
            </NavItem>
          )}
        {checkPermissions(user.permissions, multi_tenant) && (
          <NavItem>
            <NavLink
              className={this.activeTab('organizations')}
              onClick={() => this.toggleTab('organizations')}
            >
              Organizations
            </NavLink>
          </NavItem>
        )}
      </Nav>
    );
  }
}

TabMenu.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(TabMenu));

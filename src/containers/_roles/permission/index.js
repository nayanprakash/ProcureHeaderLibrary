import React from 'react';
import PropTypes from 'prop-types';
import Menu from './menu';
import Transactions from './transactions';
import Admin from './admin';

const Permissions = ({
  user,
  menuPermissions,
  menuPermissionsArr,
  permissionsList,
  _handleCheck
}) => {
  return (
    <div className="row">
      <div className="col-lg-4 col-md-12">
        <div className="permission_box_wrap">
          <h3>Menu Permissions</h3>
          <Menu
            permissionsList={permissionsList}
            menuPermissionsArr={menuPermissionsArr}
            _handleCheck={_handleCheck}
            menuPermissions={menuPermissions}
          />
        </div>
      </div>
      <div className="col-lg-4 col-md-12">
        <div className="permission_box_wrap">
          <h3>Transactions</h3>
          <Transactions menuPermissionsArr={menuPermissionsArr} _handleCheck={_handleCheck} />
        </div>
      </div>
      <div className="col-lg-4 col-md-12">
        <div className="permission_box_wrap">
          <h3>Admin Permissions</h3>
          <Admin user={user} menuPermissionsArr={menuPermissionsArr} _handleCheck={_handleCheck} />
        </div>
      </div>
    </div>
  );
};

Permissions.propTypes = {
  user: PropTypes.object.isRequired,
  menuPermissions: PropTypes.array.isRequired,
  menuPermissionsArr: PropTypes.array.isRequired,
  permissionsList: PropTypes.array.isRequired,
  _handleCheck: PropTypes.func.isRequired
};

export default Permissions;

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

const Menu = ({ permissionsList, menuPermissionsArr, _handleCheck, menuPermissions }) => {
  return (
    <div className="permission_box">
      <div className="row">
        <div className="col-4" />
        <div className="col-2 permit-action">View</div>
        <div className="col-2 permit-action">New</div>
        <div className="col-2 permit-action">Edit</div>
        <div className="col-2 permit-action">Delete</div>
      </div>
      <div className="row">
        <div className="col-4 text-right">
          <strong>Select All</strong>
        </div>
        <div className="col-2 permit-action">
          <span
            className={
              permissionsList.length &&
              _.difference(
                _.chain(permissionsList)
                  .pluck('view')
                  .pluck('_id')
                  .value(),
                menuPermissionsArr
              ).length === 0
                ? 'active'
                : ''
            }
            onClick={() => _handleCheck('view')}
          >
            <i className="fa fa-minus" aria-hidden="true" />
          </span>
        </div>
        <div className="col-2 permit-action">
          <span
            className={
              permissionsList.length &&
              _.difference(
                _.chain(permissionsList)
                  .pluck('new')
                  .pluck('_id')
                  .value(),
                menuPermissionsArr
              ).length === 0
                ? 'active'
                : ''
            }
            onClick={() => _handleCheck('new')}
          >
            <i className="fa fa-minus" aria-hidden="true" />
          </span>
        </div>
        <div className="col-2 permit-action">
          <span
            className={
              permissionsList.length &&
              _.difference(
                _.chain(permissionsList)
                  .pluck('edit')
                  .pluck('_id')
                  .value(),
                menuPermissionsArr
              ).length === 0
                ? 'active'
                : ''
            }
            onClick={() => _handleCheck('edit')}
          >
            <i className="fa fa-minus" aria-hidden="true" />
          </span>
        </div>
        <div className="col-2 permit-action">
          <span
            className={
              permissionsList.length &&
              _.difference(
                _.chain(permissionsList)
                  .pluck('delete')
                  .pluck('_id')
                  .value(),
                menuPermissionsArr
              ).length === 0
                ? 'active'
                : ''
            }
            onClick={() => _handleCheck('delete')}
          >
            <i className="fa fa-minus" aria-hidden="true" />
          </span>
        </div>
      </div>
      {permissionsList.map((val, index) => (
        <div className="row" key={`menu_${index}`}>
          <div className="col-4 text-right minheight27">
            {menuPermissions[index].capitalizeFirstLetter()}
          </div>
          <div className="col-2 permit-action">
            <span
              className={menuPermissionsArr.includes(val.view._id) ? 'active' : ''}
              onClick={() => _handleCheck(val.view._id)}
            >
              <i className="fa fa-minus" aria-hidden="true" />
            </span>
          </div>
          <div className="col-2 permit-action">
            <span
              className={menuPermissionsArr.includes(val.new._id) ? 'active' : ''}
              onClick={() => _handleCheck(val.new._id)}
            >
              <i className="fa fa-minus" aria-hidden="true" />
            </span>
          </div>
          <div className="col-2 permit-action">
            <span
              className={menuPermissionsArr.includes(val.edit._id) ? 'active' : ''}
              onClick={() => _handleCheck(val.edit._id)}
            >
              <i className="fa fa-minus" aria-hidden="true" />
            </span>
          </div>
          <div className="col-2 permit-action">
            <span
              className={menuPermissionsArr.includes(val.delete._id) ? 'active' : ''}
              onClick={() => _handleCheck(val.delete._id)}
            >
              <i className="fa fa-minus" aria-hidden="true" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

Menu.propTypes = {
  permissionsList: PropTypes.array.isRequired,
  menuPermissionsArr: PropTypes.array.isRequired,
  menuPermissions: PropTypes.array.isRequired,
  _handleCheck: PropTypes.func.isRequired
};

export default Menu;

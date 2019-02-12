import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { admin } from '../../../constants';
import { checkPermissions } from '../../../auth';
import { multi_tenant } from '../../../constants';

const Admin = ({ user, menuPermissionsArr, _handleCheck }) => {
  return (
    <div className="permission_box">
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-12 height13" />
          </div>
          <div className="row">
            <div className="col-7 text-right">
              <strong>Select All</strong>
            </div>
            <div className="col-5 permit-action">
              <span
                className={
                  _.difference(
                    _.chain(admin)
                      .pluck('_id')
                      .value(),
                    menuPermissionsArr
                  ).length === 0
                    ? 'active'
                    : ''
                }
                onClick={() => _handleCheck('admin')}
              >
                <i className="fa fa-minus" aria-hidden="true" />
              </span>
            </div>
          </div>
          {admin.slice(0, Math.ceil(admin.length / 2)).map((val, index) => (
            <div className="row" key={`admin_${index}`}>
              <div className="col-7 text-right minheight27">{val.name.capitalizeEachLetter()}</div>
              <div className="col-5 permit-action">
                <span
                  className={menuPermissionsArr.includes(val._id) ? 'active' : ''}
                  onClick={() => _handleCheck(val._id)}
                >
                  <i className="fa fa-minus" aria-hidden="true" />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="col">
          <div className="row">
            <div className="col-12 height13" />
          </div>
          <div className="row">
            <div className="col-12 height20" />
          </div>
          {admin.slice(Math.ceil(admin.length / 2), admin.length).map((val, index) => {
            if (!checkPermissions(user.permissions, multi_tenant) && val._id === 'multi_tenant') {
              return null;
            } else {
              return (
                <div className="row" key={`admin_2_${index}`}>
                  <div className="col-7 text-right minheight27">
                    {val.name.capitalizeEachLetter()}
                  </div>
                  <div className="col-5 permit-action">
                    <span
                      className={menuPermissionsArr.includes(val._id) ? 'active' : ''}
                      onClick={() => _handleCheck(val._id)}
                    >
                      <i className="fa fa-minus" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

Admin.propTypes = {
  user: PropTypes.object.isRequired,
  menuPermissionsArr: PropTypes.array.isRequired,
  _handleCheck: PropTypes.func.isRequired
};

export default Admin;

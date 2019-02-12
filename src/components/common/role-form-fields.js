import React from 'react';
import { Control } from 'react-redux-form';
import { required } from '../../utilities/Regex';
import { checkPermissions } from '../../auth';
import { multi_tenant } from '../../constants';

export default ({ organizations, user, name = '', description = '', organization = '' }) => {
  return (
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor="rolename">
          Role Name <span className="errors">*</span>
        </label>
        <Control.text
          model=".name"
          className="form-control"
          validators={{
            required
          }}
          defaultValue={name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <Control.textarea
          model=".description"
          className="form-control"
          defaultValue={description}
        />
      </div>
      {checkPermissions(user.permissions, multi_tenant) &&
        name === '' && (
          <div className="form-group">
            <label htmlFor="exampleSelect1">
              Organization <span className="errors">*</span>
            </label>
            <Control.select
              className="form-control"
              model=".organization_id"
              defaultValue={organization.toString()}
              validators={{
                required
              }}
            >
              <option value="">Select Organization</option>
              {organizations.map((val, index) => (
                <option key={index} value={val.id}>
                  {val.name.capitalizeEachLetter()}
                </option>
              ))}
            </Control.select>
          </div>
        )}
    </div>
  );
};

import React from 'react';
import Switch from 'react-toggle-switch';
import { Control, LocalForm } from 'react-redux-form';
import { CircularProgress } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import { required, validateEmail } from '../../utilities/Regex';
import { checkPermissions } from '../../auth';
import { multi_tenant } from '../../constants';

export default ({
  imagePreviewUrl,
  user,
  history,
  organizations,
  roles,
  sites,
  _toggleSwitch,
  switched,
  processing,
  button = 'Save',
  _handleSubmit,
  _handleSubmitFailed,
  _handleImageChange,
  _handleOnChange = undefined,
  fname = '',
  lname = '',
  email = '',
  role = '',
  organization = '',
  site = '',
  passVisibilty = false,
  _buttonToggle = undefined,
  _resetPassword = undefined,
  _onDrop = undefined,
  isResetPassowrd = false
}) => {
  return (
    <LocalForm
      model="user"
      className="New_User"
      onSubmit={_handleSubmit}
      onSubmitFailed={_handleSubmitFailed}
      autoComplete="off"
    >
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label>Profile Image</label>
            <label className="custom-upload-btn-wrap" htmlFor="profile_image">
              <input
                type="file"
                className="form-control"
                id="profile_image"
                onChange={_handleImageChange}
                accept="image/*"
              />
              <Dropzone
                onDrop={_onDrop}
                className="Custom_upload_btn"
                accept="image/*"
                disableClick={true}
              >
                <p>
                  Upload or<br />Drop File
                </p>
                <span className="upload_btn_icon">
                  <img src={imagePreviewUrl} alt="" width="100%" />
                </span>
              </Dropzone>
            </label>
          </div>
        </div>
      </div>
      {checkPermissions(user.permissions, multi_tenant) && (
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="exampleSelect1">
                Organization <span className="errors">*</span>
              </label>
              <Control.select
                className="form-control"
                model=".organization_id"
                defaultValue={organization.toString()}
                onChange={_handleOnChange}
                id="organization"
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
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="FirstName">
              First Name <span className="errors">*</span>
            </label>
            <Control.text
              model=".first_name"
              className="form-control"
              defaultValue={fname}
              validators={{
                required
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="LastName">
              Last Name <span className="errors">*</span>
            </label>
            <Control.text
              model=".last_name"
              className="form-control"
              defaultValue={lname}
              validators={{
                required
              }}
            />
          </div>
        </div>
      </div>
      {fname === '' && (
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="Password">
                Password <span className="errors">*</span>
              </label>
              <div className="input-with-btn clearfix">
                <Control.text
                  model=".password"
                  autoComplete="new-password"
                  type={passVisibilty ? 'text' : 'password'}
                  className="form-control"
                  validators={{
                    required
                  }}
                />
                <button
                  type="button"
                  className={passVisibilty ? 'btn btn-danger' : 'btn btn-success'}
                  onClick={_buttonToggle}
                >
                  {passVisibilty ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="Email">
              Email <span className="errors">*</span>
            </label>
            <Control.text
              model=".email"
              type="email"
              autoComplete="new-email"
              className="form-control"
              defaultValue={email}
              validators={{
                required,
                validateEmail
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="exampleSelect1">Default Site</label>
            <Control.select
              className="form-control"
              model=".site_id"
              defaultValue={site ? site.id : ''}
              id="site"
            >
              <option value="">Select Site</option>
              {sites.map((val, index) => (
                <option value={val.id} key={`site_${index}`}>
                  {val.name}
                </option>
              ))}
            </Control.select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="exampleSelect1">
              User Role <span className="errors">*</span>
            </label>
            <Control.select
              className="form-control"
              model=".roles"
              defaultValue={role}
              id="roles"
              validators={{
                required
              }}
            >
              <option value="">Select role</option>
              {roles.map((val, index) => (
                <option key={index} value={val._id}>
                  {val.name.capitalizeEachLetter()}
                </option>
              ))}
            </Control.select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="exampleSelect1">Active</label>
            <Switch onClick={_toggleSwitch} on={switched} className="other-class" />
          </div>
        </div>
      </div>
      <div className="action-btn-wrap d-md-flex justify-content-md-end align-items-md-center">
        <button disabled={processing || isResetPassowrd} className="btn btn-success" type="submit">
          {processing ? <CircularProgress size={15} color={'inherit'} /> : button}
        </button>
        <Control.reset
          id="reset"
          model="user"
          className="btn btn-cancel"
          style={{ display: 'none' }}
        >
          Cancel
        </Control.reset>
        {fname !== '' && (
          <button
            type="button"
            className="btn btn-info"
            onClick={_resetPassword}
            disabled={processing || isResetPassowrd}
          >
            {isResetPassowrd ? <CircularProgress size={15} color={'inherit'} /> : 'Reset Password'}
          </button>
        )}
        <button
          type="button"
          onClick={() => history.goBack()}
          className="btn btn-cancel"
          disabled={processing || isResetPassowrd}
        >
          Cancel
        </button>
      </div>
    </LocalForm>
  );
};

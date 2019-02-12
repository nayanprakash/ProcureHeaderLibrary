import React from 'react';
import { Control, LocalForm } from 'react-redux-form';
import { CircularProgress } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import { required, validateEmail } from '../../utilities/Regex';

export default ({
  imagePreviewUrl,
  history,
  roles,
  processing,
  _handleSubmit,
  _buttonToggle,
  passVisibilty,
  _handleSubmitFailed,
  _handleImageChange,
  _onDrop,
  fname = '',
  lname = '',
  email = ''
}) => {
  return (
    <LocalForm
      model="user"
      className="New_User"
      onSubmit={_handleSubmit}
      onSubmitFailed={_handleSubmitFailed}
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
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="Password">Password </label>
            <div className="input-with-btn clearfix">
              <Control.text
                model=".password"
                type={passVisibilty ? 'text' : 'password'}
                className="form-control"
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
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="Email">
              Email <span className="errors">*</span>
            </label>
            <Control.text
              model=".email"
              type="email"
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
            <label htmlFor="Email">User Role(s)</label>
            <Control.text
              disabled={true}
              model=".roles"
              className="form-control"
              defaultValue={roles.capitalizeEachLetter()}
            />
          </div>
        </div>
      </div>
      <div
        className="action-btn-wrap d-md-flex justify-content-md-end align-items-md-center"
        style={{ marginTop: 40 }}
      >
        <button disabled={processing} className="btn btn-success" type="submit">
          {processing ? <CircularProgress size={15} color={'inherit'} /> : 'Save'}
        </button>
        <Control.reset
          id="reset"
          model="user"
          className="btn btn-cancel"
          style={{ display: 'none' }}
        >
          Cancel
        </Control.reset>
        <button
          disabled={processing}
          type="button"
          className="btn btn-cancel"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
      </div>
    </LocalForm>
  );
};

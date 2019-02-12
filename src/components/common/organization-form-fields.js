import React from 'react';
import Switch from 'react-toggle-switch';
import { Control, LocalForm } from 'react-redux-form';
import { CircularProgress } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import { required, validateEmail } from '../../utilities/Regex';

export default ({
  history,
  _handleSubmit,
  _handleSubmitFailed,
  _handleImageChange,
  switched,
  imagePreviewUrl,
  _toggleSwitch,
  processing,
  button = 'Save',
  name = '',
  email = '',
  address = '',
  city = '',
  state = '',
  zip_code = '',
  phone_1 = '',
  phone_2 = '',
  isActiveButton = true,
  _onDrop = undefined
}) => {
  return (
    <LocalForm
      model="organisation"
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
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="organisation">
              Organization Name <span className="errors">*</span>
            </label>
            <Control.text
              model=".name"
              className="form-control"
              defaultValue={name}
              validators={{
                required
              }}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="address">
              Address <span className="errors">*</span>
            </label>
            <Control.text
              model=".address"
              className="form-control"
              defaultValue={address}
              validators={{
                required
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="zip">
              Zip <span className="errors">*</span>
            </label>
            <Control.text
              model=".zip_code"
              className="form-control"
              defaultValue={zip_code}
              validators={{
                required
              }}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="city">
              City <span className="errors">*</span>
            </label>
            <Control.text
              model=".city"
              className="form-control"
              defaultValue={city}
              validators={{
                required
              }}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="state">
              State <span className="errors">*</span>
            </label>
            <Control.text
              model=".state"
              className="form-control"
              defaultValue={state}
              validators={{
                required
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="phone1">
              Phone 1 <span className="errors">*</span>
            </label>
            <Control.text
              model=".phone_1"
              className="form-control"
              defaultValue={phone_1}
              validators={{
                required
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="phone2">Phone 2</label>
            <Control.text model=".phone_2" defaultValue={phone_2} className="form-control" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="errors">*</span>
            </label>
            <Control.text
              model=".email"
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
            {isActiveButton ? (
              [
                <label htmlFor="exampleSelect1">Active</label>,
                <Switch onClick={_toggleSwitch} on={switched} className="other-class" />
              ]
            ) : (
              <div style={{ marginTop: 40 }} />
            )}
          </div>
        </div>
      </div>

      <div className="action-btn-wrap d-md-flex justify-content-md-end align-items-md-center">
        <button disabled={processing} className="btn btn-success" type="submit">
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
        <button
          type="button"
          onClick={() => history.goBack()}
          className="btn btn-cancel"
          disabled={processing}
        >
          Cancel
        </button>
      </div>
    </LocalForm>
  );
};

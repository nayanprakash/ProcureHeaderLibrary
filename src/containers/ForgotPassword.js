import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Control, LocalForm } from 'react-redux-form';
import { CircularProgress } from '@material-ui/core';
import Header from '../components/FrontHeader';
import './_styles/login.scss';
import { forgotPassword } from '../actions/user';
import { required, validateEmail } from '../utilities/Regex';
import AlertMsg from '../components/AlertMsg';
import { setErrorTime } from '../actions/toast-actions';
import Message from '../constants/messages';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      alertVisible: false,
      message: '',
      status: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitFailed = this.handleSubmitFailed.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  /************ Dismiss error on close **********/
  onDismiss() {
    this.setState({ alertVisible: false });
  }
  /******* form validation errors */
  setErrors(message) {
    this.setState({
      status: false,
      alertVisible: true,
      message
    });
    setErrorTime(this);
  }

  /*********  Call on submit failed ***********/
  handleSubmitFailed(user) {
    if (user.email.errors.required) {
      this.setErrors(Message.emailRequired);
    } else if (user.password.errors.validateEmail) {
      this.setErrors(Message.validEmail);
    }
  }
  /*********  Handle submit forgot function ***********/
  handleSubmit(_user) {
    const { forgotPassword } = this.props;
    this.setState({ processing: true });
    forgotPassword({ email: _user.email, token: '' }, res => {
      if (res.status) {
        this.setState({
          status: true,
          alertVisible: true,
          processing: false,
          message: res.message
        });
        setErrorTime(this);
      } else {
        this.setState({
          status: false,
          alertVisible: true,
          processing: false,
          message: res.message
        });
        setErrorTime(this);
      }
    });
  }

  render() {
    const { status, processing, alertVisible, message } = this.state;
    return (
      <div>
        <Header />
        <section id="main-content">
          <div className="wrapper">
            <LocalForm
              model="user"
              className="form-auth form-login form-horizontal forgot--form"
              onSubmit={this.handleSubmit}
              onSubmitFailed={this.handleSubmitFailed}
            >
              <h2 className="form-auth-heading text-info">Forgot Password</h2>
              <div className="login-wrap">
                <p className="forgot_message">
                  Enter your e-mail address below to receive a password reset link.
                </p>
                <AlertMsg
                  status={status}
                  visible={alertVisible}
                  _onDismiss={this.onDismiss}
                  message={message}
                />
                <Control.text
                  type="email"
                  className="form-control"
                  model=".email"
                  placeholder="Email"
                  validators={{
                    required,
                    validateEmail
                  }}
                />
                <button
                  disabled={processing}
                  className="btn btn-inline-block btn-success"
                  type="submit"
                  id="btnSave"
                >
                  {processing ? <CircularProgress size={15} color={'inherit'} /> : 'Send'}
                </button>
              </div>
            </LocalForm>
          </div>
        </section>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  forgotPassword: bindActionCreators(forgotPassword, dispatch)
});

export default connect(null, mapDispatchToProps)(ForgotPassword);

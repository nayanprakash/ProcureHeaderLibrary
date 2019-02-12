import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Control, LocalForm } from 'react-redux-form';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Header from '../components/FrontHeader';
import './_styles/login.scss';
import { login, authenticate, validateToken } from '../actions/user';
import { goToRoute } from '../auth';
import { required, validateEmail } from '../utilities/Regex';
import AlertMsg from '../components/AlertMsg';
import { setErrorTime } from '../actions/toast-actions';
import Message from '../constants/messages';
import { auth } from '../constants/app-config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.user.rememberMe.email,
      password: props.user.rememberMe.password,
      processing: false,
      alertVisible: false,
      message: '',
      status: false,
      remember: props.user.rememberMe.email ? true : false
    };
    this.handleLogin = this.handleLogin.bind(this);
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
    } else if (user.password.errors.required) {
      this.setErrors(Message.requiredField('password'));
    }
  }
  /*********  Handle login function ***********/
  handleLogin(_user) {
    const { login, authenticate, validateToken, history } = this.props;
    this.setState({ processing: true });
    let item = {
      grant_type: auth.GRANT_TYPE,
      username: _user.email,
      password: _user.password,
      audience: `https://${auth.DOMAIN}/userinfo`,
      scope: auth.SCOPE,
      client_id: auth.CLIENT_ID,
      client_secret: auth.CLIENT_SECRET,
      remember: this.state.remember
    };
    login(item, res => {
      if (res && res.id_token) {
        authenticate({ token: res.id_token }, result => {
          if (result.status) {
            validateToken({ token: result.token }, response => {
              if (response.status) {
                history.replace(goToRoute(response.data.permissions));
              } else {
                this.setState({
                  processing: false,
                  status: false,
                  alertVisible: true,
                  message: response.message
                });
              }
            });
          } else {
            this.setState({
              processing: false,
              status: false,
              alertVisible: true,
              message: result.message
            });
          }
        });
      } else {
        this.setState({
          processing: false,
          status: false,
          alertVisible: true,
          message: res.message
        });
      }
    });
  }

  render() {
    const { status, processing, alertVisible, message, remember, email, password } = this.state;
    return (
      <div>
        <Header />
        <section id="main-content">
          <div className="wrapper">
            <LocalForm
              model="user"
              className="form-auth form-login form-horizontal"
              onSubmit={this.handleLogin}
              onSubmitFailed={this.handleSubmitFailed}
            >
              <h2 className="form-auth-heading text-info">Welcome!</h2>
              <div className="login-wrap">
                <AlertMsg
                  status={status}
                  visible={alertVisible}
                  _onDismiss={this.onDismiss}
                  message={message}
                />
                <div className="form-group row">
                  <label className="control-label col-lg-2 col-md-2 " forhtml="email">
                    Email
                  </label>
                  <div className="col-lg-10 col-md-10 pad" style={{ paddingBottom: '10px' }}>
                    <Control.text
                      type="email"
                      className="form-control"
                      model=".email"
                      placeholder="Email"
                      defaultValue={email}
                      validators={{
                        required,
                        validateEmail
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="control-label col-lg-2 col-md-2" forhtml="email">
                    Password
                  </label>
                  <div className="col-lg-10 col-md-10 pad" style={{ paddingBottom: '10px' }}>
                    <Control.text
                      type="password"
                      className="form-control"
                      model=".password"
                      placeholder="Password"
                      defaultValue={password}
                      validators={{
                        required
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="checkbox chk col-lg-5 col-lg-offset-2 col-md-5 col-md-offset-2 col-sm-5 col-xs-5">
                    <label style={{ paddingLeft: '10px' }} id="rememberMe">
                      <input
                        type="checkbox"
                        name="rememberme"
                        tabIndex="3"
                        onChange={() => this.setState({ remember: !remember })}
                        checked={remember}
                      />{' '}
                      Remember me
                    </label>
                  </div>

                  <div className="col-lg-5 col-md-5 col-sm-7 pwd col-xs-7 pwd">
                    <label className="pull-right">
                      <Link to="/forgot-password" tabIndex="4">
                        Forgot Password?
                      </Link>
                    </label>
                  </div>
                </div>
                <button
                  disabled={processing}
                  className="btn btn-inline-block btn-success"
                  type="submit"
                  id="btnSave"
                >
                  {processing ? <CircularProgress size={15} color={'inherit'} /> : 'Login'}
                </button>
              </div>
            </LocalForm>
          </div>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired,
  validateToken: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(login, dispatch),
  authenticate: bindActionCreators(authenticate, dispatch),
  validateToken: bindActionCreators(validateToken, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

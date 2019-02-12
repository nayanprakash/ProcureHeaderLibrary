import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabContent, TabPane, Card, Row, Col } from 'reactstrap';
import _ from 'underscore';
import { updateUserProfile } from '../../actions/user';
import { getRoles } from '../../actions/role';
import DEFAULT_IMAGE from '../../assets/images/upload_btn_icon.png';
import FormFields from './profile-form';
import AlertMsg from '../../components/AlertMsg';
import { setErrorTime } from '../../actions/toast-actions';
import Message from '../../constants/messages';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: props.user.user_metadata.photo_url
        ? props.user.user_metadata.photo_url
        : DEFAULT_IMAGE,
      file: null,
      processing: false,
      status: true,
      alertVisible: false,
      message: '',
      passVisibilty: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.handleSubmitFailed = this.handleSubmitFailed.bind(this);
    this.buttonToggle = this.buttonToggle.bind(this);
    this.onDropFiles = this.onDropFiles.bind(this);
  }

  componentDidMount() {
    const { user, getRoles } = this.props;
    getRoles({ token: user.token }, () => {});
  }
  // handle logo(image) upload
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    let context = this;
    reader.onloadend = () => {
      context.setState({
        file: file ? file : '',
        imagePreviewUrl: reader.result
      });
    };
    if (file) reader.readAsDataURL(file);
  }
  /*********** On Drag Drop files ***********/
  onDropFiles(files) {
    let reader = new FileReader();
    let file = files[0];
    let context = this;
    reader.onloadend = () => {
      context.setState({
        file: file ? file : '',
        imagePreviewUrl: reader.result
      });
    };
    if (file) reader.readAsDataURL(file);
  }
  /************ Dismiss error on close **********/
  onDismiss() {
    this.setState({ alertVisible: false });
  }
  /************* Show hide password **********/
  buttonToggle() {
    this.setState({ passVisibilty: !this.state.passVisibilty });
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
    if (user.first_name.errors.required) {
      this.setErrors(Message.requiredField('first name'));
    } else if (user.last_name.errors.required) {
      this.setErrors(Message.requiredField('last name'));
    } else if (user.email.errors.required) {
      this.setErrors(Message.emailRequired);
    } else if (user.password.errors.validateEmail) {
      this.setErrors(Message.validEmail);
    }
  }
  /************ Handle submit for Add user *********/
  handleSubmit(_user) {
    const { user, updateUserProfile } = this.props;
    this.setState({ processing: true });
    let userObj = { organization_id: user.tenant_id };
    userObj = { ...userObj, ..._user };
    delete userObj.roles;
    updateUserProfile(
      {
        ...userObj,
        token: user.token,
        file: this.state.file
      },
      res => {
        if (res.status) {
          this.setState({
            status: true,
            alertVisible: true,
            processing: false,
            message: res.message,
            file: null
          });
          setErrorTime(this);
        } else {
          this.setState({
            status: false,
            alertVisible: true,
            message: res.message,
            processing: false
          });
          setErrorTime(this);
        }
      }
    );
  }

  render() {
    const {
      imagePreviewUrl,
      processing,
      status,
      alertVisible,
      message,
      passVisibilty
    } = this.state;
    const { user, users } = this.props;
    const _user = _.findWhere(users, { id: user.user_id });
    // const _roles = roles.filter(val => val.users && val.users.includes(user.sub));
    return (
      <div className="main-content">
        <TabContent activeTab="1" className="Custom-Tab-Content">
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Card body>
                  <div className="md-center">
                    <h4 className="tab-heading">Edit Profile</h4>
                    <AlertMsg
                      status={status}
                      visible={alertVisible}
                      _onDismiss={this.onDismiss}
                      message={message}
                    />
                    <FormFields
                      {...this.props}
                      _handleSubmit={this.handleSubmit}
                      _handleSubmitFailed={this.handleSubmitFailed}
                      _handleImageChange={this.handleImageChange}
                      imagePreviewUrl={imagePreviewUrl}
                      roles={_user.roles}
                      processing={processing}
                      fname={user.user_metadata.first_name}
                      lname={user.user_metadata.last_name}
                      email={_user ? _user.email : ''}
                      passVisibilty={passVisibilty}
                      _buttonToggle={this.buttonToggle}
                      _onDrop={this.onDropFiles}
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

AddUser.propTypes = {
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
  roles: state.roles
});

const mapDispatchToProps = dispatch => ({
  updateUserProfile: bindActionCreators(updateUserProfile, dispatch),
  getRoles: bindActionCreators(getRoles, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);

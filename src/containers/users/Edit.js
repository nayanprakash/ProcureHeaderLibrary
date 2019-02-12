import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabContent, TabPane, Card, Row, Col } from 'reactstrap';
import _ from 'underscore';
import { updateUser, getUserById, forgotPassword } from '../../actions/user';
import { getSites } from '../../actions/sites';
import { getRolesByOrganizationsById } from '../../actions/role';
import FormFields from '../../components/common/user-form-fields';
import Loader from '../../components/ProcessingLoader';
import DEFAULT_IMAGE from '../../assets/images/upload_btn_icon.png';
import AlertMsg from '../../components/AlertMsg';
import { setErrorTime } from '../../actions/toast-actions';
import Message from '../../constants/messages';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: true,
      imagePreviewUrl: DEFAULT_IMAGE,
      file: null,
      processing: false,
      organization: '',
      user: null,
      loading: true,
      notFound: '',
      status: true,
      alertVisible: false,
      message: '',
      roles: [],
      isResetPassowrd: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.handleSubmitFailed = this.handleSubmitFailed.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.onDropFiles = this.onDropFiles.bind(this);
  }

  componentWillMount() {
    const { user, getRoles, getUserById, match, getUserSites } = this.props;
    /********** Get user by id **********/
    getUserById({ token: user.token, id: match.params._id }, res => {
      if (res.status) {
        this.setState({
          user: res.data,
          imagePreviewUrl: res.data.image ? res.data.image : DEFAULT_IMAGE,
          loading: false,
          switched: res.data.is_active ? true : false
        });
        /********** Get roles for users **********/
        getRoles({ token: user.token, id: res.data.organization_id }, res => {
          if (res.status) {
            this.setState({
              roles: res.data
            });
          }
        });
        /********** Get sites for users **********/
        getUserSites({ token: user.token, organization_id: res.data.organization_id }, () => {});
      } else {
        this.setState({ loading: false, notFound: 'User Not Found!' });
      }
    });
  }

  /************** Reset password ************/
  resetPassword() {
    const { user, forgotPassword } = this.props;
    this.setState({ isResetPassowrd: true });
    forgotPassword({ token: user.token, email: this.state.user.email }, res => {
      if (res.status) {
        this.setState({
          status: true,
          alertVisible: true,
          isResetPassowrd: false,
          message: res.message
        });
        setErrorTime(this);
      } else {
        this.setState({
          status: false,
          alertVisible: true,
          isResetPassowrd: false,
          message: res.message
        });
        setErrorTime(this);
      }
    });
  }
  /*********** selecte organization ************/
  handleOnChange(e) {
    const { user, getRoles, getUserSites } = this.props;
    /********** Get roles for users **********/
    getRoles({ token: user.token, id: e.target.value }, res => {
      if (res.status) {
        this.setState({ roles: res.data });
      }
    });
    /********** Get sites for users **********/
    getUserSites({ token: user.token, organization_id: e.target.value }, () => {});
  }
  /************ Active/inactive toggle users ***************/
  toggleSwitch = () => {
    this.setState(prevState => {
      return {
        switched: !prevState.switched
      };
    });
  };
  /************ Dismiss error on close **********/
  onDismiss() {
    this.setState({ alertVisible: false });
  }
  // handle image upload
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
    if (user.organization_id && user.organization_id.errors.required) {
      this.setErrors(Message.selectRequired('organization'));
    } else if (user.first_name.errors.required) {
      this.setErrors(Message.requiredField('first name'));
    } else if (user.last_name.errors.required) {
      this.setErrors(Message.requiredField('last name'));
    } else if (user.email.errors.required) {
      this.setErrors(Message.emailRequired);
    } else if (user.email.errors.validateEmail) {
      this.setErrors(Message.validEmail);
    } else if (user.roles.errors.required) {
      this.setErrors(Message.selectRequired('role'));
    }
  }
  /******** Handle submit for update user ************/
  handleSubmit(_user) {
    const { user, updateUser, match } = this.props;
    const { switched, file } = this.state;
    this.setState({ processing: true });
    let userObj = { organization_id: user.tenant_id };
    userObj = { ...userObj, ..._user };
    updateUser(
      {
        ...userObj,
        _id: match.params._id,
        file,
        is_active: switched,
        token: user.token
      },
      res => {
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
      }
    );
  }

  render() {
    const {
      imagePreviewUrl,
      processing,
      switched,
      user,
      loading,
      notFound,
      status,
      alertVisible,
      message,
      roles,
      isResetPassowrd
    } = this.state;
    return (
      <div className="main-content">
        <TabContent activeTab="1" className="Custom-Tab-Content">
          <TabPane tabId="1">
            <Row>
              <Loader isShowingLoader={loading} />
              <Col sm="12">
                <Card body>
                  <div className="md-center">
                    <h4 className="tab-heading">Edit User</h4>
                    <AlertMsg
                      status={status}
                      visible={alertVisible}
                      _onDismiss={this.onDismiss}
                      message={message}
                    />
                    {user ? (
                      <FormFields
                        {...this.props}
                        _handleSubmit={this.handleSubmit}
                        _handleSubmitFailed={this.handleSubmitFailed}
                        _handleImageChange={this.handleImageChange}
                        imagePreviewUrl={imagePreviewUrl}
                        roles={roles}
                        _toggleSwitch={this.toggleSwitch}
                        switched={switched}
                        processing={processing}
                        button={'Save'}
                        fname={user.first_name}
                        lname={user.last_name}
                        email={user.email}
                        role={user.role_id}
                        organization={user.organization_id}
                        sites={this.props.sites}
                        site={_.findWhere(this.props.sites, { name: user.site_key })}
                        _handleOnChange={this.handleOnChange}
                        _resetPassword={this.resetPassword}
                        isResetPassowrd={isResetPassowrd}
                        _onDrop={this.onDropFiles}
                      />
                    ) : (
                      notFound
                    )}
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

EditUser.propTypes = {
  user: PropTypes.object.isRequired,
  sites: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
  updateUser: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  getUserSites: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  sites: state.sites,
  organizations: state.organizations
});

const mapDispatchToProps = dispatch => ({
  updateUser: bindActionCreators(updateUser, dispatch),
  getRoles: bindActionCreators(getRolesByOrganizationsById, dispatch),
  getUserById: bindActionCreators(getUserById, dispatch),
  getUserSites: bindActionCreators(getSites, dispatch),
  forgotPassword: bindActionCreators(forgotPassword, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);

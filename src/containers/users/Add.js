import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabContent, TabPane, Card, Row, Col } from 'reactstrap';
import { addUser } from '../../actions/user';
import { getSites } from '../../actions/sites';
import { getRolesByOrganizationsById } from '../../actions/role';
import DEFAULT_IMAGE from '../../assets/images/upload_btn_icon.png';
import FormFields from '../../components/common/user-form-fields';
import AlertMsg from '../../components/AlertMsg';
import { setErrorTime } from '../../actions/toast-actions';
import Message from '../../constants/messages';
//import FileSaver, { saveAs } from 'file-saver';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: true,
      imagePreviewUrl: DEFAULT_IMAGE,
      file: null,
      processing: false,
      status: true,
      alertVisible: false,
      message: '',
      roles: [],
      passVisibilty: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.handleSubmitFailed = this.handleSubmitFailed.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.buttonToggle = this.buttonToggle.bind(this);
    this.onDropFiles = this.onDropFiles.bind(this);
  }

  componentWillMount() {
    const { user, getUserSites, getRoles } = this.props;
    /********** Get roles for users **********/
    getRoles({ token: user.token, id: user.tenant_id }, res => {
      if (res.status) {
        this.setState({ roles: res.data });
      }
    });
    /********** Get sites for users **********/
    getUserSites({ token: user.token, organization_id: user.tenant_id }, () => {});
  }

  /*********** selecte organization ************/
  handleOnChange(e) {
    let obj = this.props.organizations.find(o => o.id.toString() === e.target.value);

    this.setState({
      imagePreviewUrl: obj && obj.photo_url
    });

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

  /************* Show hide password **********/
  buttonToggle() {
    this.setState({ passVisibilty: !this.state.passVisibilty });
  }

  /************ Active/inactive toggle users ***************/
  toggleSwitch = () => {
    this.setState(prevState => {
      return {
        switched: !prevState.switched
      };
    });
  };

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
    } else if (user.password.errors.required) {
      this.setErrors(Message.requiredField('password'));
    } else if (user.email.errors.required) {
      this.setErrors(Message.emailRequired);
    } else if (user.email.errors.validateEmail) {
      this.setErrors(Message.validEmail);
    } else if (user.roles.errors.required) {
      this.setErrors(Message.selectRequired('role'));
    }
  }
  /************ Handle submit for Add user *********/
  handleSubmit(_user) {
    const { user, addUser } = this.props;
    this.setState({ processing: true });
    let userObj = { organization_id: user.tenant_id };
    userObj = { ...userObj, ..._user };
    addUser(
      {
        ...userObj,
        is_active: this.state.switched,
        token: user.token,
        file: this.state.file
      },
      res => {
        if (res.status) {
          document.getElementById('organization').value = '';
          document.getElementById('site').value = '';
          document.getElementById('roles').value = '';
          document.getElementById('reset').click();
          this.setState({
            status: true,
            alertVisible: true,
            processing: false,
            message: res.message,
            imagePreviewUrl: DEFAULT_IMAGE,
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
      switched,
      status,
      alertVisible,
      message,
      roles,
      passVisibilty
    } = this.state;
    return (
      <div className="main-content">
        <TabContent activeTab="1" className="Custom-Tab-Content">
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Card body>
                  <div className="md-center">
                    <h4 className="tab-heading">New User</h4>
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
                      roles={roles}
                      _toggleSwitch={this.toggleSwitch}
                      switched={switched}
                      processing={processing}
                      sites={this.props.sites}
                      _handleOnChange={this.handleOnChange}
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
  sites: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
  addUser: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  getUserSites: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  sites: state.sites,
  organizations: state.organizations
});

const mapDispatchToProps = dispatch => ({
  addUser: bindActionCreators(addUser, dispatch),
  getRoles: bindActionCreators(getRolesByOrganizationsById, dispatch),
  getUserSites: bindActionCreators(getSites, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);

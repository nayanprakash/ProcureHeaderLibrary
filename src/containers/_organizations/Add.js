import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabContent, TabPane, Card, Row, Col } from 'reactstrap';
import DEFAULT_IMAGE from '../../assets/images/upload_btn_icon.png';
import FormFields from '../../components/common/organization-form-fields';
import { addOrganizations } from '../../actions/organization';
import AlertMsg from '../../components/AlertMsg';
import { setErrorTime } from '../../actions/toast-actions';
import Message from '../../constants/messages';

class AddOrganisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: true,
      processing: false,
      imagePreviewUrl: DEFAULT_IMAGE,
      file: null,
      status: true,
      alertVisible: false,
      message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.handleSubmitFailed = this.handleSubmitFailed.bind(this);
    this.onDropFiles = this.onDropFiles.bind(this);
  }

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
  handleSubmitFailed(organization) {
    if (organization.name.errors.required) {
      this.setErrors(Message.requiredField('organization name'));
    } else if (organization.address.errors.required) {
      this.setErrors(Message.requiredField('address'));
    } else if (organization.zip_code.errors.required) {
      this.setErrors(Message.requiredField('zip code'));
    } else if (organization.city.errors.required) {
      this.setErrors(Message.requiredField('city'));
    } else if (organization.state.errors.required) {
      this.setErrors(Message.requiredField('state'));
    } else if (organization.phone_1.errors.required) {
      this.setErrors(Message.requiredField('phone 1'));
    } else if (organization.email.errors.required) {
      this.setErrors(Message.requiredField('email'));
    } else if (organization.email.errors.validateEmail) {
      this.setErrors(Message.validEmail);
    }
  }
  /********* Add organization on submit **********/
  handleSubmit(organisation) {
    const { user, addOrganizations } = this.props;
    this.setState({ processing: true });
    addOrganizations(
      {
        ...organisation,
        token: user.token,
        file: this.state.file,
        is_active: this.state.switched ? 1 : 0
      },
      res => {
        if (res.status) {
          document.getElementById('reset').click();
          this.setState({
            status: true,
            alertVisible: true,
            processing: false,
            message: res.message,
            file: null,
            imagePreviewUrl: DEFAULT_IMAGE
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
    const { switched, processing, imagePreviewUrl, status, alertVisible, message } = this.state;
    return (
      <div className="main-content">
        <TabContent activeTab="1" className="Custom-Tab-Content">
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Card body>
                  <div className="md-center">
                    <h4 className="tab-heading">New Organization</h4>
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
                      switched={switched}
                      imagePreviewUrl={imagePreviewUrl}
                      _toggleSwitch={this.toggleSwitch}
                      processing={processing}
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

AddOrganisation.propTypes = {
  user: PropTypes.object.isRequired,
  addOrganizations: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  addOrganizations: bindActionCreators(addOrganizations, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddOrganisation);

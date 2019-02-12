import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabContent, TabPane, Card, Row, Col } from 'reactstrap';
import DEFAULT_IMAGE from '../../assets/images/upload_btn_icon.png';
import FormFields from '../../components/common/organization-form-fields';
import Loader from '../../components/ProcessingLoader';
import { getOrganizationsById, editOrganizations } from '../../actions/organization';
import AlertMsg from '../../components/AlertMsg';
import { setErrorTime } from '../../actions/toast-actions';
import Message from '../../constants/messages';

class EditOrganisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: true,
      processing: false,
      imagePreviewUrl: DEFAULT_IMAGE,
      file: null,
      organisation: null,
      notFound: '',
      loading: true,
      status: true,
      alertVisible: false,
      message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitFailed = this.handleSubmitFailed.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onDropFiles = this.onDropFiles.bind(this);
  }

  componentDidMount() {
    const { user, getOrganizationsById, match } = this.props;
    const id = match.params && match.params._id ? match.params._id : user.tenant_id;
    getOrganizationsById({ token: user.token, id }, res => {
      if (res.status) {
        this.setState({
          organisation: res.data,
          loading: false,
          imagePreviewUrl: res.data.photo_url ? res.data.photo_url : DEFAULT_IMAGE
        });
      } else {
        this.setState({ notFound: 'Organization Not Found!', loading: false });
      }
    });
  }
  /********* toggle active / inactive organization **********/
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
  /********* update organization on submit **********/
  handleSubmit(organisation) {
    const { user, editOrganizations, match } = this.props;
    this.setState({ processing: true });
    const id = match.params && match.params._id ? match.params._id : user.tenant_id;
    editOrganizations(
      {
        ...organisation,
        token: user.token,
        file: this.state.file,
        is_active: this.state.switched ? 1 : 0,
        id
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
      switched,
      processing,
      imagePreviewUrl,
      organisation,
      notFound,
      loading,
      status,
      alertVisible,
      message
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
                    <h4 className="tab-heading">Edit Organization</h4>
                    <AlertMsg
                      status={status}
                      visible={alertVisible}
                      _onDismiss={this.onDismiss}
                      message={message}
                    />
                    {organisation ? (
                      <FormFields
                        {...this.props}
                        _handleSubmit={this.handleSubmit}
                        _handleSubmitFailed={this.handleSubmitFailed}
                        _handleImageChange={this.handleImageChange}
                        switched={switched}
                        imagePreviewUrl={imagePreviewUrl}
                        _toggleSwitch={this.toggleSwitch}
                        processing={processing}
                        name={organisation.name}
                        email={organisation.email}
                        address={organisation.address}
                        city={organisation.city}
                        state={organisation.state}
                        zip_code={organisation.zip_code}
                        phone_1={organisation.phone_1}
                        phone_2={organisation.phone_2}
                        button="Save"
                        isActiveButton={
                          this.props.match.params && this.props.match.params._id ? true : false
                        }
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

EditOrganisation.propTypes = {
  user: PropTypes.object.isRequired,
  getOrganizationsById: PropTypes.func.isRequired,
  editOrganizations: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getOrganizationsById: bindActionCreators(getOrganizationsById, dispatch),
  editOrganizations: bindActionCreators(editOrganizations, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrganisation);

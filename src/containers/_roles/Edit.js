import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabContent, TabPane, Card, Row, Col } from 'reactstrap';
import { LocalForm } from 'react-redux-form';
import _ from 'underscore';
import { CircularProgress } from '@material-ui/core';
import Loader from '../../components/ProcessingLoader';
import { getRolesPermissions, updateRole, getRoleById } from '../../actions/role';
import Permissions from './permission';
import FormFields from '../../components/common/role-form-fields';
import AlertMsg from '../../components/AlertMsg';
import { setErrorTime } from '../../actions/toast-actions';
import Message from '../../constants/messages';

import {
  transactionAssets,
  transactionInventory,
  menuView,
  menuNew,
  menuEdit,
  menuDelete,
  admin,
  menuPermissions
} from '../../constants';

class EditRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionsList: [],
      menuPermissionsArr: [],
      transaction: [],
      transactionAssest: [],
      admin: [],
      processing: false,
      name: '',
      description: '',
      organization: '',
      loading: true,
      notFound: '',
      permissions: [],
      status: true,
      alertVisible: false,
      message: ''
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.handleSubmitFailed = this.handleSubmitFailed.bind(this);
  }

  componentWillMount() {
    const { user, getRolesPermissions } = this.props;
    getRolesPermissions({ token: user.token }, res => {
      if (res.status) {
        menuPermissions.map(menu => {
          this.state.permissionsList.push({
            view: menuView.filter(val => val.name.includes(menu))[0],
            new: menuNew.filter(val => val.name.includes(menu))[0],
            edit: menuEdit.filter(val => val.name.includes(menu))[0],
            delete: menuDelete.filter(val => val.name.includes(menu))[0]
          });
          return menu;
        });
        this.setState({
          ...this.state,
          permissions: res.data.permissions
        });
      }
    });
  }

  componentDidMount() {
    const { user, getRoleById, match } = this.props;
    /************** Get role detail by Id **************/
    getRoleById({ token: user.token, id: match.params._id }, res => {
      if (res.status) {
        let permissions = [];
        res.data.permissions.map(val => {
          let _permissions = _.findWhere(this.state.permissions, { _id: val });
          if (_permissions) {
            permissions.push(_permissions.name);
          }
          return null;
        });

        this.setState({
          name: res.data.name,
          description: res.data.description,
          organization: res.data.organization_id,
          menuPermissionsArr: permissions,
          loading: false
        });
      } else {
        this.setState({ loading: false, notFound: 'Role Not Found!' });
      }
    });
  }
  /************ Dismiss error on close **********/
  onDismiss() {
    this.setState({ alertVisible: false });
  }
  /*********** Submit role ***********/
  handleSubmit(role) {
    const permissions = [],
      { user, updateRole, match } = this.props;
    this.setState({ processing: true });
    let obj = { organization_id: user.tenant_id };
    obj = { ...obj, ...role };

    this.state.menuPermissionsArr.map(val => {
      let _permissions = _.findWhere(this.state.permissions, { name: val });
      if (_permissions) {
        permissions.push(_permissions._id);
      }
      return null;
    });
    updateRole(
      {
        ...obj,
        id: match.params._id,
        token: user.token,
        permissions
      },
      res => {
        if (res.status) {
          this.setState({
            status: true,
            alertVisible: true,
            processing: false,
            message: res.message
          });
          window.scrollTo(0, 0);
          setTimeout(() => {
            this.onDismiss();
          }, 30000);
        } else {
          this.setState({
            status: false,
            alertVisible: true,
            processing: false,
            message: res.message
          });
          window.scrollTo(0, 0);
          setTimeout(() => {
            this.onDismiss();
          }, 30000);
        }
      }
    );
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
  handleSubmitFailed(role) {
    if (role.name.errors.required) {
      this.setErrors(Message.requiredField('role name'));
    } else if (role.organization_id && role.organization_id.errors.required) {
      this.setErrors(Message.selectRequired('organization'));
    }
  }

  /*********** Add remove permissions for role ***********/
  handleCheck(value) {
    const { menuPermissionsArr } = this.state;
    if (value === 'transaction') {
      const _transaction = _.chain(transactionInventory)
        .pluck('_id')
        .value();
      if (_.difference(_transaction, menuPermissionsArr).length === 0) {
        this.setState({
          menuPermissionsArr: _.difference(menuPermissionsArr, _transaction)
        });
      } else {
        const unionArr = _.union(menuPermissionsArr, _transaction);
        this.setState({ menuPermissionsArr: unionArr });
      }
    } else if (value === 'view') {
      const view = _.chain(menuView)
        .pluck('_id')
        .value();
      if (_.difference(view, menuPermissionsArr).length === 0) {
        this.setState({
          menuPermissionsArr: _.difference(menuPermissionsArr, view)
        });
      } else {
        const unionArr = _.union(menuPermissionsArr, view);
        this.setState({ menuPermissionsArr: unionArr });
      }
    } else if (value === 'new') {
      const _new = _.chain(menuNew)
        .pluck('_id')
        .value();
      if (_.difference(_new, menuPermissionsArr).length === 0) {
        this.setState({
          menuPermissionsArr: _.difference(menuPermissionsArr, _new)
        });
      } else {
        const unionArr = _.union(menuPermissionsArr, _new);
        this.setState({ menuPermissionsArr: unionArr });
      }
    } else if (value === 'edit') {
      const edit = _.chain(menuEdit)
        .pluck('_id')
        .value();
      if (_.difference(edit, menuPermissionsArr).length === 0) {
        this.setState({
          menuPermissionsArr: _.difference(menuPermissionsArr, edit)
        });
      } else {
        const unionArr = _.union(menuPermissionsArr, edit);
        this.setState({ menuPermissionsArr: unionArr });
      }
    } else if (value === 'delete') {
      const _delete = _.chain(menuDelete)
        .pluck('_id')
        .value();
      if (_.difference(_delete, menuPermissionsArr).length === 0) {
        this.setState({
          menuPermissionsArr: _.difference(menuPermissionsArr, _delete)
        });
      } else {
        const unionArr = _.union(menuPermissionsArr, _delete);
        this.setState({ menuPermissionsArr: unionArr });
      }
    } else if (value === 'transactionAssest') {
      const assets = _.chain(transactionAssets)
        .pluck('_id')
        .value();
      if (_.difference(assets, menuPermissionsArr).length === 0) {
        this.setState({
          menuPermissionsArr: _.difference(menuPermissionsArr, assets)
        });
      } else {
        const unionArr = _.union(menuPermissionsArr, assets);
        this.setState({ menuPermissionsArr: unionArr });
      }
    } else if (value === 'admin') {
      const _admin = _.chain(admin)
        .pluck('_id')
        .value();
      if (_.difference(_admin, menuPermissionsArr).length === 0) {
        this.setState({
          menuPermissionsArr: _.difference(menuPermissionsArr, _admin)
        });
      } else {
        const unionArr = _.union(menuPermissionsArr, _admin);
        this.setState({ menuPermissionsArr: unionArr });
      }
    } else {
      const index = menuPermissionsArr.findIndex(val => val === value);
      if (index > -1) {
        menuPermissionsArr.splice(index, 1);
      } else {
        menuPermissionsArr.push(value);
      }
      this.setState({ menuPermissionsArr });
    }
  }

  render() {
    const {
      menuPermissionsArr,
      permissionsList,
      processing,
      organization,
      name,
      description,
      loading,
      notFound,
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
                  <h4 className="tab-heading">Edit Role</h4>
                  <AlertMsg
                    status={status}
                    visible={alertVisible}
                    _onDismiss={this.onDismiss}
                    message={message}
                  />
                  {name ? (
                    <LocalForm
                      model="role"
                      onSubmit={this.handleSubmit}
                      onSubmitFailed={this.handleSubmitFailed}
                    >
                      <div className="edit_role_form">
                        <div className="row">
                          <FormFields
                            {...this.props}
                            name={name}
                            description={description}
                            organization={organization}
                          />
                        </div>
                      </div>
                      <div className="permissions">
                        <Permissions
                          {...this.props}
                          menuPermissions={menuPermissions}
                          menuPermissionsArr={menuPermissionsArr}
                          permissionsList={permissionsList}
                          _handleCheck={this.handleCheck}
                        />
                      </div>
                      <div className="action-btn-wrap d-md-flex justify-content-md-end align-items-md-center">
                        <button disabled={processing} type="submit" className="btn btn-success">
                          {processing ? <CircularProgress size={15} color={'inherit'} /> : 'Save'}
                        </button>
                        <button
                          type="button"
                          onClick={() => this.props.history.goBack()}
                          className="btn btn-cancel"
                        >
                          Cancel
                        </button>
                      </div>
                    </LocalForm>
                  ) : (
                    notFound
                  )}
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

EditRoles.propTypes = {
  user: PropTypes.object.isRequired,
  organizations: PropTypes.array.isRequired,
  getRolesPermissions: PropTypes.func.isRequired,
  updateRole: PropTypes.func.isRequired,
  getRoleById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  organizations: state.organizations
});

const mapDispatchToProps = dispatch => ({
  getRolesPermissions: bindActionCreators(getRolesPermissions, dispatch),
  updateRole: bindActionCreators(updateRole, dispatch),
  getRoleById: bindActionCreators(getRoleById, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRoles);

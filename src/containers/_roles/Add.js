import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabContent, TabPane, Card, Row, Col } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import _ from 'underscore';
import { CircularProgress } from '@material-ui/core';
import { getRolesPermissions, addRole } from '../../actions/role';
import Permissions from './permission';
import FormFields from '../../components/common/role-form-fields';
import AlertMsg from '../../components/AlertMsg';
import { setErrorTime } from '../../actions/toast-actions';
import Loader from '../../components/ProcessingLoader';
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

class AddRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionsList: [],
      menuPermissionsArr: [],
      transaction: [],
      transactionAssest: [],
      admin: [],
      processing: false,
      permissions: [],
      status: true,
      alertVisible: false,
      message: '',
      switched: true,
      loading: true
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitFailed = this.handleSubmitFailed.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
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
          permissions: res.data.permissions,
          loading: false
        });
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
      { user, addRole } = this.props;
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

    addRole({ ...obj, token: user.token, permissions }, res => {
      if (res.status) {
        document.getElementById('reset').click();
        this.setState({
          status: true,
          alertVisible: true,
          processing: false,
          message: res.message,
          menuPermissionsArr: []
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
    });
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
      status,
      alertVisible,
      message,
      loading
    } = this.state;
    return (
      <div className="main-content">
        <TabContent activeTab="1" className="Custom-Tab-Content">
          <TabPane tabId="1">
            <Row>
              <Loader isShowingLoader={loading} />
              <Col sm="12">
                <Card body>
                  <h4 className="tab-heading">New Role</h4>
                  <AlertMsg
                    status={status}
                    visible={alertVisible}
                    _onDismiss={this.onDismiss}
                    message={message}
                  />
                  {permissionsList.length > 0 && (
                    <LocalForm
                      model="role"
                      onSubmit={this.handleSubmit}
                      onSubmitFailed={this.handleSubmitFailed}
                    >
                      <div className="edit_role_form">
                        <div className="row">
                          <FormFields {...this.props} />
                        </div>
                      </div>
                      <div className="permissions" key="1">
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
                        <Control.reset
                          id="reset"
                          model="role"
                          className="btn btn-cancel"
                          style={{ display: 'none' }}
                        >
                          Cancel
                        </Control.reset>
                        <button
                          type="button"
                          onClick={() => this.props.history.goBack()}
                          className="btn btn-cancel"
                        >
                          Cancel
                        </button>
                      </div>
                    </LocalForm>
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

AddRoles.propTypes = {
  user: PropTypes.object.isRequired,
  organizations: PropTypes.array.isRequired,
  getRolesPermissions: PropTypes.func.isRequired,
  addRole: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  organizations: state.organizations
});

const mapDispatchToProps = dispatch => ({
  getRolesPermissions: bindActionCreators(getRolesPermissions, dispatch),
  addRole: bindActionCreators(addRole, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRoles);

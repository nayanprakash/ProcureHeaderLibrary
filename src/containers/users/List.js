import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabContent, TabPane, Card, Row, Col } from 'reactstrap';
import _ from 'underscore';
import GenricTable from '../../components/common/genric-table';
import { createFilter } from 'react-search-input';
import Search from '../../components/common/search';
import DropDownList from '../../components/common/drop-down-list';
import Pagination from '../../components/common/pagination';
import Buttons from '../../components/common/common-buttons';
import { getUsers, deleteUser, checked, update_profile } from '../../actions/user';
import Loader from '../../components/ProcessingLoader';
import { itemListPerPage } from '../../constants';
//import { getOrganizations } from '../../actions/organization';
import AlertMsg from '../../components/AlertMsg';
import AlertBox from '../../components/AlertBox';
import { setErrorTime } from '../../actions/toast-actions';
import { checkPermissions } from '../../auth';
import { multi_tenant } from '../../constants';
import { Link } from 'react-router-dom';

/********** Keys names for search **********/
const KEYS_TO_FILTERS = [
  'first_name',
  'last_name',
  'email',
  'last_login_at',
  'roles',
  'organization'
];

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.searchUpdated = this.searchUpdated.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.serachByOrganizatio = this.serachByOrganizatio.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.state = {
      activePage: 1,
      dropdownOpen: false,
      _id: null,
      data: [],
      loading: true,
      searchTerm: '',
      ITEM_PER_PAGE: 10,
      processing: false,
      status: true,
      alertVisible: false,
      message: '',
      open: false,
      msgStatus: false,
      type: ''
    };
    this.indexOfLastList = 1 * this.state.ITEM_PER_PAGE;
    this.indexOfFirstList = this.indexOfLastList - this.state.ITEM_PER_PAGE;
  }

  componentDidMount() {
    //const { user, getUsers, getOrganizations, update_profile } = this.props;
    const { user, getUsers, update_profile } = this.props;
    /************ Get users List ***********/
    getUsers({ token: user.token }, res => {
      if (res.status || !res.status) {
        const USER = _.findWhere(this.props.users, { id: user.user_id });
        if (USER) {
          const updatedObject = {
            email: USER.email,
            user_metadata: {
              first_name: USER.first_name,
              last_name: USER.last_name,
              photo_url: USER.image,
              is_active: USER.is_active,
              user_id: user.user_id
            }
          };
          update_profile(updatedObject);
        }
        this.setState({ loading: false });
      }
    });
    /************* Get Organizations list *************/
    //getOrganizations({ token: user.token }, () => {});
  }
  /************ Dismiss error on close **********/
  onDismiss() {
    this.setState({ alertVisible: false });
  }
  /********* Set active page *********/
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }
  /********* Set records according to per page *********/
  handleOnChange(event) {
    this.setState({
      ITEM_PER_PAGE: Number(event.target.value),
      activePage: 1
    });
  }
  /********* Search Method *********/
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  /********** Clear search *********/
  clearSearch() {
    this.setState({ searchTerm: '' });
  }
  /****** on click of a button in ligtbox asks for a confirmation to delete the record  *****/
  confirmDelete() {
    const { activePage, ITEM_PER_PAGE, searchTerm } = this.state;
    this.indexOfLastList = activePage * ITEM_PER_PAGE;
    this.indexOfFirstList = this.indexOfLastList - ITEM_PER_PAGE;
    const totalRecords = this.props.users.filter(createFilter(searchTerm, KEYS_TO_FILTERS)),
      records = totalRecords.slice(this.indexOfFirstList, this.indexOfLastList),
      index = records.findIndex(val => val.checked);
    this.setState({
      open: true,
      message:
        index !== -1 ? 'Are you sure you want to perform delete?' : 'Please select a record.',
      type: index !== -1 ? 'Delete!' : '',
      msgStatus: 'warning'
    });
  }
  /************** Delete Record *********/
  handleDelete() {
    const { _id } = this.state;
    if (_id) {
      this.setState({ processing: true, open: false });
      const { user, deleteUser } = this.props;
      deleteUser({ token: user.token, _id }, res => {
        if (res.status) {
          this.setState({
            status: true,
            alertVisible: true,
            processing: false,
            message: res.message,
            _id: null
          });
          setErrorTime(this);
        } else {
          this.setState({
            status: true,
            alertVisible: true,
            processing: false,
            message: res.message
          });
          setErrorTime(this);
        }
      });
    }
  }
  /************ Search users by organizations ***********/
  serachByOrganizatio(event) {
    this.setState({
      searchTerm: event.target.value === 'All' ? '' : event.target.value,
      activePage: 1
    });
  }

  render() {
    const {
      activePage,
      _id,
      loading,
      searchTerm,
      ITEM_PER_PAGE,
      processing,
      status,
      alertVisible,
      message,
      open,
      msgStatus,
      type
    } = this.state;
    this.indexOfLastList = activePage * ITEM_PER_PAGE;
    this.indexOfFirstList = this.indexOfLastList - ITEM_PER_PAGE;
    const totalRecords = this.props.users.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
    const records = totalRecords.slice(this.indexOfFirstList, this.indexOfLastList);
    //const organizationsList = [{ name: 'All' }, ...this.props.organizations];
    return (
      <div className="main-content">
        <TabContent activeTab="1" className="Custom-Tab-Content">
          <TabPane tabId="1">
            <Row>
              <Loader isShowingLoader={loading} />
              <Col sm="12">
                <Card body>
                  <h4 className="tab-heading cs_heading">Users</h4>
                  <AlertMsg
                    status={status}
                    visible={alertVisible}
                    _onDismiss={this.onDismiss}
                    message={message}
                  />
                  <AlertBox
                    _actionConfirmed={() => this.handleDelete()}
                    _onPress={() => this.setState({ open: false })}
                    isShowingModal={open}
                    message={message}
                    type={type}
                    status={msgStatus}
                  />
                  <div className="row">
                    <div className="col-md-12 new-user">
                      <Link to={`${this.props.location.pathname}/add`} className="btn btn-success">
                        New User
                      </Link>
                    </div>
                    <div className="col-md-6">
                      <Search
                        _searchUpdated={this.searchUpdated}
                        _clearSearch={this.clearSearch}
                        value={searchTerm}
                      />
                    </div>
                    <div className="col-md-6 d-flex justify-content-md-end">
                      {checkPermissions(this.props.user.permissions, multi_tenant) && (
                        <div className="search-wrap custom-select-dropdown">
                          <p>Organizations</p>
                          {/* <DropDownList
                            keyName="name"
                            data={organizationsList}
                            _handleOnChange={this.serachByOrganizatio}
                          /> */}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pagination-section">
                    <p className="result-per-page">
                      Showing {activePage} to {records.length} of {totalRecords.length} entries
                    </p>
                    <div className="row">
                      <div className="col-md-6 total-views d-md-flex justify-content-md-start align-items-md-center">
                        <DropDownList
                          keyName="id"
                          data={itemListPerPage}
                          _handleOnChange={this.handleOnChange}
                        />
                      </div>
                      <div className="col-md-6 pagination-wrap d-md-flex justify-content-md-end align-items-md-center">
                        <Pagination
                          activePage={activePage}
                          ItemPerPage={ITEM_PER_PAGE}
                          length={totalRecords.length}
                          _handlePageChange={this.handlePageChange.bind(this)}
                        />
                      </div>
                    </div>
                  </div>
                  <GenricTable
                    records={records}
                    columns={
                      checkPermissions(this.props.user.permissions, multi_tenant)
                        ? this.props.columns.superAdminUser
                        : this.props.columns.adminUser
                    }
                    pageSize={ITEM_PER_PAGE}
                    loading={loading}
                    _getTdProps={(state, rowInfo, column, instance) => {
                      return {
                        state,
                        onClick: () => {
                          this.props.checked({ id: rowInfo.original.id });
                          this.setState({ _id: rowInfo.original.id });
                        },
                        column,
                        instance
                      };
                    }}
                  />
                  <div className="Bottom-Pagination pagination-wrap d-md-flex justify-content-md-end align-items-md-center">
                    <Pagination
                      activePage={activePage}
                      ItemPerPage={ITEM_PER_PAGE}
                      length={totalRecords.length}
                      _handlePageChange={this.handlePageChange.bind(this)}
                    />
                  </div>
                  <Buttons
                    {...this.props}
                    id={_id}
                    _handleDelete={() => this.confirmDelete()}
                    processing={processing}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

UsersList.propTypes = {
  user: PropTypes.object.isRequired,
  organizations: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  //getOrganizations: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired,
  checked: PropTypes.func.isRequired,
  update_profile: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
  organizations: state.organizations,
  columns: state.columns
});

const mapDispatchToProps = dispatch => ({
  getUsers: bindActionCreators(getUsers, dispatch),
  deleteUser: bindActionCreators(deleteUser, dispatch),
  //getOrganizations: bindActionCreators(getOrganizations, dispatch),
  checked: bindActionCreators(checked, dispatch),
  update_profile: bindActionCreators(update_profile, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);

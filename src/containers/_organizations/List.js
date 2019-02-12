import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabContent, TabPane, Card, Row, Col } from 'reactstrap';
import GenricTable from '../../components/common/genric-table';
import { createFilter } from 'react-search-input';
import Search from '../../components/common/search';
import DropDownList from '../../components/common/drop-down-list';
import Pagination from '../../components/common/pagination';
import Buttons from '../../components/common/common-buttons';
import { getOrganizations, deleteOrganization, checked } from '../../actions/organization';
import Loader from '../../components/ProcessingLoader';
import { itemListPerPage } from '../../constants';
import AlertMsg from '../../components/AlertMsg';
import AlertBox from '../../components/AlertBox';
import { setErrorTime } from '../../actions/toast-actions';
import { Link } from 'react-router-dom';
/********** Keys names for search **********/
const KEYS_TO_FILTERS = [
  'name',
  'address',
  'city',
  'state',
  'zip_code',
  'phone_1',
  'phone_2',
  'admin',
  'email'
];

class OrganizationsList extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.serachByOrganizatio = this.serachByOrganizatio.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.state = {
      activePage: 1,
      loaderStatus: false,
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
    const { user, getOrganizations } = this.props;
    getOrganizations({ token: user.token }, res => {
      if (res.status) {
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
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
  /********* Search function *********/
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  /********** Clear search **********/
  clearSearch() {
    this.setState({ searchTerm: '' });
  }
  /****** on click of a button in ligtbox asks for a confirmation to delete the record  *****/
  confirmDelete() {
    const { activePage, ITEM_PER_PAGE, searchTerm } = this.state;
    this.indexOfLastList = activePage * ITEM_PER_PAGE;
    this.indexOfFirstList = this.indexOfLastList - ITEM_PER_PAGE;
    const totalRecords = this.props.organizations.filter(createFilter(searchTerm, KEYS_TO_FILTERS)),
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
  /*********** Delete Record ************/
  handleDelete() {
    const { user, deleteOrganization } = this.props;
    if (this.state._id) {
      this.setState({ processing: true, open: false });
      deleteOrganization({ _id: this.state._id, token: user.token }, res => {
        if (res.status) {
          this.setState({
            status: true,
            alertVisible: true,
            processing: false,
            message: res.message,
            _id: null,
            activePage: 1
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
  }
  /*********** Search By Organization ************/
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
      type,
      msgStatus
    } = this.state;
    this.indexOfLastList = activePage * ITEM_PER_PAGE;
    this.indexOfFirstList = this.indexOfLastList - ITEM_PER_PAGE;
    const totalRecords = this.props.organizations.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
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
                  <h4 className="tab-heading cs_heading">Organizations</h4>
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
                        New Organization
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Search
                        _searchUpdated={this.searchUpdated}
                        _clearSearch={this.clearSearch}
                        value={searchTerm}
                      />
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
                          ItemPerPage={Number(ITEM_PER_PAGE)}
                          length={totalRecords.length}
                          _handlePageChange={this.handlePageChange.bind(this)}
                        />
                      </div>
                    </div>
                  </div>
                  <GenricTable
                    records={records}
                    columns={this.props.columns.organization}
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
                  <div className="Bottom-Pagination pagination-wrap d-flex justify-content-md-end align-items-md-center">
                    <Pagination
                      activePage={activePage}
                      ItemPerPage={ITEM_PER_PAGE}
                      length={totalRecords.length}
                      _handlePageChange={this.handlePageChange.bind(this)}
                    />
                  </div>
                  <div className="action-btn-wrap d-flex justify-content-md-end align-items-md-center">
                    <Buttons
                      {...this.props}
                      id={_id}
                      _handleDelete={() => this.confirmDelete()}
                      processing={processing}
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

OrganizationsList.propTypes = {
  user: PropTypes.object.isRequired,
  organizations: PropTypes.array.isRequired,
  getOrganizations: PropTypes.func.isRequired,
  deleteOrganization: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired,
  checked: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  organizations: state.organizations,
  columns: state.columns
});

const mapDispatchToProps = dispatch => ({
  getOrganizations: bindActionCreators(getOrganizations, dispatch),
  deleteOrganization: bindActionCreators(deleteOrganization, dispatch),
  checked: bindActionCreators(checked, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsList);

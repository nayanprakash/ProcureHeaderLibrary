import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CSVLink } from 'react-csv';
import { ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { update_header_column, toggleDropDown } from '../actions/header-columns';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggle = this.toggle.bind(this);
    this.showHide = this.showHide.bind(this);
  }
  /************ Toggle drop-down **********/
  toggle() {
    this.props.toggleDropDown({ dropdownOpen: !this.props.columns.dropdownOpen });
  }
  /************ Show/hide column **********/
  showHide(index) {
    const { column, columns, update_header_column, toggleDropDown } = this.props;
    if (column.id === 'user-setings') {
      columns.adminUser[index + 1].show = !columns.adminUser[index + 1].show;
    } else if (column.id === 'super-admin-user-setings') {
      columns.superAdminUser[index + 1].show = !columns.superAdminUser[index + 1].show;
    } else if (column.id === 'admin-role-setings') {
      columns.adminRole[index + 1].show = !columns.adminRole[index + 1].show;
    } else if (column.id === 'super-admin-role-setings') {
      columns.superAdminRole[index + 1].show = !columns.superAdminRole[index + 1].show;
    } else if (column.id === 'organization-setings') {
      columns.organization[index + 1].show = !columns.organization[index + 1].show;
    }
    update_header_column({ columns });
    toggleDropDown({ dropdownOpen: true });
  }

  /************** Columns list ***************/
  columnsList() {
    const { column, columns } = this.props;
    let columnsList = [];
    if (column && column.id === 'user-setings') {
      columnsList = columns.adminUser;
    } else if (column && column.id === 'super-admin-user-setings') {
      columnsList = columns.superAdminUser;
    } else if (column && column.id === 'admin-role-setings') {
      columnsList = columns.adminRole;
    } else if (column && column.id === 'super-admin-role-setings') {
      columnsList = columns.superAdminRole;
    } else if (column && column.id === 'organization-setings') {
      columnsList = columns.organization;
    }

    return columnsList.slice(1, columnsList.length - 1).map((val, index) => (
      <li key={index}>
        <span onClick={() => this.showHide(index)}>
          <input type="checkbox" defaultChecked={val.show ? 'checked' : ''} /> {val.Header}
        </span>
      </li>
    ));
  }

  render() {
    const { data, column, columns } = this.props;
    let columnsList = [];
    if (column && column.id === 'user-setings') {
      columnsList = columns.adminUser;
    } else if (column && column.id === 'super-admin-user-setings') {
      columnsList = columns.superAdminUser;
    } else if (column && column.id === 'admin-role-setings') {
      columnsList = columns.adminRole;
    } else if (column && column.id === 'super-admin-role-setings') {
      columnsList = columns.superAdminRole;
    } else if (column && column.id === 'organization-setings') {
      columnsList = columns.organization;
    }
    const headers = columnsList.slice(1, columnsList.length - 1).map(val => {
      let data = {};
      data.label = val.Header;
      data.key = val.accessor;
      return data;
    });
    return (
      <ButtonDropdown isOpen={columns.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle>
          <i className="fa fa-cog" aria-hidden="true" />
        </DropdownToggle>
        <DropdownMenu className="option-menu">
          <li key="show-hide">
            <span>Show / Hide</span>
          </li>
          <li role="separator" className="divider" />
          <span className="dropdown-menu-header">Columns :</span>
          {this.columnsList()}
          <li key="separator" role="separator" className="divider" />
          <li key="export">
            <span id="export">
              <CSVLink
                data={data}
                headers={headers}
                filename={`${column.id.substring(0, column.id.lastIndexOf('-'))}.csv`}
              >
                Export CSV
              </CSVLink>
            </span>
          </li>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

Settings.propTypes = {
  columns: PropTypes.object.isRequired,
  update_header_column: PropTypes.func.isRequired,
  toggleDropDown: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  columns: state.columns
});

const mapDispatchToProps = dispatch => ({
  update_header_column: bindActionCreators(update_header_column, dispatch),
  toggleDropDown: bindActionCreators(toggleDropDown, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

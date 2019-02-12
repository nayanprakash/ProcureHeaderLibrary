/*
 * @file: header-columns.js
 * @description: It Contain all tables header columns.
 * @date: 25.07.2018
 * @author: Jasdeep Singh
 */

import React from 'react';
import moment from 'moment';
import Settings from '../components/Settings';
import defaultImage from '../assets/images/procure-square-logo-96px.png';
/************ User table header cloumn list **********/
export const userTableColumns = [
  {
    Header: '#',
    accessor: 'id',
    sortable: false,
    show: true,
    Cell: ({ original }) => (
      <label className="radio-container">
        <input
          type="radio"
          name="radio"
          id={original.id}
          checked={original.hasOwnProperty('checked') ? original.checked : false}
          onChange={() => {}}
        />
        <span className="checkbox_wrap" />
      </label>
    ),
    width: 40
  },
  {
    Header: 'Image',
    accessor: 'image',
    show: true,
    width: 125,
    Cell: props => (
      <img src={props.value ? props.value : '../images/user.png'} alt="" width="100px" />
    )
  },
  {
    Header: 'First Name',
    accessor: 'first_name',
    show: true
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
    show: true
  },
  {
    Header: 'Email',
    accessor: 'email',
    show: true
  },
  {
    Header: 'User Role',
    accessor: 'roles',
    show: true
  },
  {
    Header: 'Active',
    accessor: 'is_active',
    show: true,
    width: 100,
    Cell: props =>
      props.value ? (
        <i className="fa fa-check green" aria-hidden="true" />
      ) : (
        <i className="fa fa-times red" aria-hidden="true" />
      )
  },
  {
    Header: 'Last Login',
    accessor: 'last_login_at',
    show: true,
    Cell: props => moment(props.value).format('YYYY-MM-DD hh:mm:ss')
  },
  {
    Header: props => <Settings {...props} />,
    accessor: 'user-setings',
    sortable: false,
    width: 50,
    show: true,
    headerClassName: 'setting-col'
  }
];

export const organizationUserTableColumns = [
  {
    Header: '#',
    accessor: 'id',
    sortable: false,
    show: true,
    Cell: ({ original }) => (
      <label className="radio-container">
        <input
          type="radio"
          name="radio"
          id={original.id}
          checked={original.hasOwnProperty('checked') ? original.checked : false}
          onChange={() => {}}
        />
        <span className="checkbox_wrap" />
      </label>
    ),
    width: 40
  },
  {
    Header: 'Image',
    accessor: 'image',
    show: true,
    width: 125,
    Cell: props => <img src={props.value ? props.value : defaultImage} alt="" width="100px" />
  },
  {
    Header: 'First Name',
    accessor: 'first_name',
    show: true
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
    show: true
  },
  {
    Header: 'Email',
    accessor: 'email',
    show: true
  },
  {
    Header: 'User Role',
    accessor: 'roles',
    show: true
  },
  {
    Header: 'Organization',
    accessor: 'organization',
    show: true
  },
  {
    Header: 'Active',
    accessor: 'is_active',
    show: true,
    width: 100,
    Cell: props =>
      props.value ? (
        <i className="fa fa-check green" aria-hidden="true" />
      ) : (
        <i className="fa fa-times red" aria-hidden="true" />
      )
  },
  {
    Header: 'Last Login',
    accessor: 'last_login_at',
    show: true,
    Cell: props => moment(props.value).format('YYYY-MM-DD hh:mm:ss')
  },
  {
    Header: props => <Settings {...props} />,
    accessor: 'super-admin-user-setings',
    sortable: false,
    width: 50,
    show: true,
    headerClassName: 'setting-col'
  }
];
/************ Organizations table header cloumn list **********/
export const organizationsTableColumns = [
  {
    Header: '#',
    accessor: '_id', // String-based value accessors!
    sortable: false,
    show: true,
    Cell: ({ original }) => (
      <label className="radio-container">
        <input
          type="radio"
          name="radio"
          id={original.id}
          checked={original.hasOwnProperty('checked') ? original.checked : false}
          onChange={() => {}}
        />
        <span className="checkbox_wrap" />
      </label>
    ),
    width: 40
  },
  {
    Header: 'Image',
    accessor: 'photo_url', // String-based value accessors!
    show: true,
    Cell: props => <img src={props.value} alt="" />
  },
  {
    Header: 'Organization',
    accessor: 'name',
    show: true
  },
  {
    Header: 'Address',
    accessor: 'address',
    show: true
  },
  {
    Header: 'City',
    accessor: 'city',
    show: true
  },
  {
    Header: 'State',
    accessor: 'state',
    show: true
  },
  {
    Header: 'Zip',
    accessor: 'zip_code',
    show: true
  },
  {
    Header: 'Phone',
    accessor: 'phone_1',
    show: true
  },
  {
    Header: 'Email',
    accessor: 'email',
    show: true
  },
  {
    Header: 'Admin',
    accessor: 'admin',
    show: true
  },
  {
    Header: 'Active',
    accessor: 'is_active',
    show: true,
    width: 100,
    Cell: props =>
      props.value ? (
        <i className="fa fa-check green" aria-hidden="true" />
      ) : (
        <i className="fa fa-times red" aria-hidden="true" />
      )
  },
  {
    Header: props => <Settings {...props} />,
    accessor: 'organization-setings',
    sortable: false,
    width: 50,
    show: true,
    headerClassName: 'setting-col'
  }
];
/************ roles table header cloumn list **********/
export const rolesTableColumns = [
  {
    Header: '#',
    accessor: '_id', // String-based value accessors!
    sortable: false,
    show: true,
    Cell: ({ original }) => (
      <label className="radio-container">
        <input
          type="radio"
          name="radio"
          id={original._id}
          checked={original.hasOwnProperty('checked') ? original.checked : false}
          onChange={() => {}}
        />
        <span className="checkbox_wrap" />
      </label>
    ),
    width: 40
  },
  {
    Header: 'Role',
    accessor: 'name',
    show: true
  },
  {
    Header: 'Description',
    accessor: 'description',
    show: true
  },
  {
    Header: 'Created By',
    accessor: 'created_by',
    show: true
  },
  {
    Header: 'Updated By',
    accessor: 'updated_by',
    show: true
  },
  {
    Header: 'Last Updated',
    accessor: 'updated_at',
    show: true,
    Cell: props => moment(props.value).format('LLL')
  },
  // {
  //   Header: 'Active',
  //   accessor: 'active',
  //   show: true,
  //   width: 100,
  //   Cell: props =>
  //     props.value ? (
  //       <i className="fa fa-check green" aria-hidden="true" />
  //     ) : (
  //       <i className="fa fa-times red" aria-hidden="true" />
  //     )
  // },
  {
    Header: props => <Settings {...props} />,
    accessor: 'admin-role-setings',
    sortable: false,
    width: 50,
    show: true,
    headerClassName: 'setting-col'
  }
];

export const superAdminRolesTableColumns = [
  {
    Header: '#',
    accessor: '_id', // String-based value accessors!
    sortable: false,
    show: true,
    Cell: ({ original }) => (
      <label className="radio-container">
        <input
          type="radio"
          name="radio"
          id={original._id}
          checked={original.hasOwnProperty('checked') ? original.checked : false}
          onChange={() => {}}
        />
        <span className="checkbox_wrap" />
      </label>
    ),
    width: 40
  },
  {
    Header: 'Organizations',
    accessor: 'organization',
    show: true,
    sortable: true
  },
  {
    Header: 'Role',
    accessor: 'name',
    show: true,
    sortable: true
  },
  {
    Header: 'Description',
    accessor: 'description',
    show: true,
    sortable: true
  },
  {
    Header: 'Created By',
    accessor: 'created_by',
    show: true,
    sortable: true
  },
  {
    Header: 'Updated By',
    accessor: 'updated_by',
    show: true,
    sortable: true
  },
  {
    Header: 'Last Updated',
    accessor: 'updated_at',
    show: true,
    Cell: props => moment(props.value).format('LLL')
  },
  {
    Header: 'Last Login',
    accessor: 'last_login_at',
    show: true,
    Cell: props => moment(props.value).format('YYYY-MM-DD hh:mm:ss')
  },
  // {
  //   Header: 'Active',
  //   accessor: 'active',
  //   show: true,
  //   width: 100,
  //   Cell: props =>
  //     props.value ? (
  //       <i className="fa fa-check green" aria-hidden="true" />
  //     ) : (
  //       <i className="fa fa-times red" aria-hidden="true" />
  //     )
  // },
  {
    Header: props => <Settings {...props} />,
    accessor: 'super-admin-role-setings',
    sortable: false,
    width: 50,
    show: true,
    headerClassName: 'setting-col'
  }
];

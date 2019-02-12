import React from 'react';
import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';
const PAGE_RANGE_SHOW = 10;

const pagination = ({ activePage, ItemPerPage, length, _handlePageChange }) => {
  return (
    <Pagination
      innerClass="pagination"
      activePage={activePage}
      itemsCountPerPage={ItemPerPage}
      prevPageText={<i className="fa fa-chevron-left customIcon" aria-hidden="true" />}
      nextPageText={<i className="fa fa-chevron-right customIcon" aria-hidden="true" />}
      totalItemsCount={length}
      pageRangeDisplayed={PAGE_RANGE_SHOW}
      onChange={_handlePageChange}
    />
  );
};

pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  ItemPerPage: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  _handlePageChange: PropTypes.func.isRequired
};

export default pagination;

import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';

const GenricTable = ({ records, columns, loading, _getTdProps, pageSize }) => {
  return (
    <div className="table-responsive Sorting_table table-striped table-hover">
      <ReactTable
        indexKey="_index"
        className="table table-bordered"
        data={records}
        columns={columns}
        pageSize={pageSize}
        collapseOnSortingChange={true}
        minRows={0}
        showPagination={false}
        loading={loading}
        getTdProps={_getTdProps}
        showPageJump={true}
        collapseOnPageChange={true}
        collapseOnDataChange={true}
        freezeWhenExpanded={false}
      />
    </div>
  );
};

GenricTable.propTypes = {
  records: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  _getTdProps: PropTypes.func.isRequired
};

export default GenricTable;

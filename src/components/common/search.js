import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from 'react-search-input';

const Search = ({ _searchUpdated, _clearSearch, value }) => {
  return (
    <div className="search-wrap">
      <p>Search</p>
      <div className="search-box">
        <SearchInput className="search-input" onChange={_searchUpdated} value={value} />
        <i
          className={value ? 'fa close-icon  fa-times-circle text-right' : ''}
          onClick={_clearSearch}
        />
      </div>
    </div>
  );
};

Search.propTypes = {
  _searchUpdated: PropTypes.func.isRequired,
  _clearSearch: PropTypes.func.isRequired
};

Search.defaultProps = {
  value: ''
};

export default Search;

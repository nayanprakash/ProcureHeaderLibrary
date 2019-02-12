import React from 'react';
import PropTypes from 'prop-types';

const DropDownList = ({ keyName, data, _handleOnChange }) => {
  return (
    <select onChange={_handleOnChange}>
      {data.map((val, index) => (
        <option value={val[keyName]} key={index}>
          {val.name}
        </option>
      ))}
    </select>
  );
};

DropDownList.propTypes = {
  keyName: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  _handleOnChange: PropTypes.func.isRequired
};

export default DropDownList;

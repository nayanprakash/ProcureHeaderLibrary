import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

const Buttons = ({ location, id, _handleDelete, processing }) => {
  return (
    <div className="action-btn-wrap d-flex justify-content-md-end align-items-md-center">
      <Link to={id ? `${location.pathname}/${id}` : '#'} className="btn btn-info" disabled={!id}>
        Edit
      </Link>
      <button disabled={processing} className="btn btn-danger" onClick={_handleDelete}>
        {processing ? <CircularProgress size={15} color={'inherit'} /> : 'Delete'}
      </button>
    </div>
  );
};

Buttons.propTypes = {
  location: PropTypes.object.isRequired,
  id: PropTypes.any,
  processing: PropTypes.bool,
  _handleDelete: PropTypes.func.isRequired
};

export default Buttons;

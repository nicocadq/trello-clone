import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteColumn } from "../../slicers/column";

const Column = ({ id }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteColumn(id));
  };

  return <div onClick={handleClick}>{id}</div>;
};

Column.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Column;

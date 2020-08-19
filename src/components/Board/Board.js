import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addColumn } from "../../slicers/column";
import Column from "../Column";

import styles from "./Board.module.scss";

const Board = ({ id }) => {
  const dispatch = useDispatch();

  const columns =
    useSelector((state) =>
      Object.values(state.columns).filter((column) => column.boardID === id)
    ) || [];

  const handleClick = () => {
    dispatch(addColumn(id));
  };

  return (
    <div className={styles.container}>
      {columns.map((column) => (
        <Column key={column.id} id={column.id} />
      ))}
      <button className={styles["add-new-column"]} onClick={handleClick}>
        Add new
      </button>
    </div>
  );
};

Board.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Board;

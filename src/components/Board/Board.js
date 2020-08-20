import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addColumn } from "../../slicers/column";
import Column from "../Column";
import AddForm from "../AddForm";

import styles from "./Board.module.scss";

const Board = ({ id }) => {
  const dispatch = useDispatch();

  const columns =
    useSelector((state) =>
      Object.values(state.columns).filter((column) => column.boardID === id)
    ) || [];

  const [isActiveForm, setIsActiveForm] = useState(true);

  const submitAction = (text) => {
    dispatch(addColumn({ boardID: id, text: text }));
  };

  const cancelAction = () => {
    setIsActiveForm(false);
  };

  const handleClick = () => {
    setIsActiveForm(true);
  };

  return (
    <div className={styles.container}>
      {columns.map((column) => (
        <Column
          key={column.id}
          column={{ id: column.id, title: column.title }}
        />
      ))}
      {isActiveForm ? (
        <AddForm
          buttonText="Add new Column"
          submitAction={(text) => submitAction(text)}
          placeholderText="Type title for new column"
          cancelAction={() => cancelAction()}
        />
      ) : (
        <button className={styles["add-new-column"]} onClick={handleClick}>
          <FontAwesomeIcon className={styles.icon} icon={faPlus} />
          Add new
        </button>
      )}
    </div>
  );
};

Board.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Board;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteColumn } from "../../slicers/column";
import { addCard } from "../../slicers/card";
import AddForm from "../AddForm";
import Card from "../Card";

import styles from "./Column.module.scss";

const Column = ({ column }) => {
  const dispatch = useDispatch();

  const { id, title } = column;

  const cards =
    useSelector((state) =>
      Object.values(state.cards).filter((card) => card.columnID === id)
    ) || [];

  const [isActiveForm, setIsActiveForm] = useState(true);

  const submitAction = (text) => {
    dispatch(addCard({ columnID: id, text: text }));
  };

  const cancelAction = () => {
    setIsActiveForm(false);
  };

  const handleDeleteColumn = () => {
    dispatch(deleteColumn(id));
  };

  const handleAdd = () => {
    setIsActiveForm(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button
            className={styles["delete-button"]}
            onClick={() => handleDeleteColumn()}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        {cards.map((card) => (
          <Card key={card.id} card={{ id: card.id, text: card.text }} />
        ))}
        {isActiveForm ? (
          <AddForm
            buttonText="Add new Card"
            submitAction={(text) => submitAction(text)}
            placeholderText="Type text for new card"
            cancelAction={() => cancelAction()}
          />
        ) : (
          <button
            className={styles["add-new-card"]}
            onClick={() => handleAdd()}
          >
            <FontAwesomeIcon className={styles.icon} icon={faPlus} />
            Add new card
          </button>
        )}
      </div>
    </div>
  );
};

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default Column;

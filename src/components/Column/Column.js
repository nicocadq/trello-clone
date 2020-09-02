import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Droppable } from "react-beautiful-dnd";
import { deleteColumn, updateColumnTitle } from "../../slicers/column";
import { addCard } from "../../slicers/card";
import AddForm from "../AddForm";
import Card from "../Card";
import EditableField from "../EditableField";

import styles from "./Column.module.scss";

const Column = ({ column }) => {
  const dispatch = useDispatch();

  const { id, title } = column;

  const cards =
    useSelector((state) =>
      Object.values(state.cards)
        .filter((card) => card.columnID === id)
        .sort((a, b) => a.index - b.index)
    ) || [];

  const [isActiveForm, setIsActiveForm] = useState(false);

  const submitAction = (text) => {
    dispatch(addCard({ columnID: id, text: text, index: cards.length }));
    setIsActiveForm(false);
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

  const handleUpdateColumnTitle = (title) => {
    dispatch(updateColumnTitle({ id: id, title: title }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <EditableField
              actionOnSave={(title) => handleUpdateColumnTitle(title)}
              textDefault={title}
            />
          </div>
          <button
            className={styles["delete-button"]}
            onClick={() => handleDeleteColumn()}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div
              className={styles.main}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {cards.map((card, index) => (
                <Card
                  key={card.id}
                  card={{ id: card.id, text: card.text }}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
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
  }).isRequired,
};

export default Column;

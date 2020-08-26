import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "react-beautiful-dnd";
import { deleteCard, updateCardText } from "../../slicers/card";
import EditableField from "../EditableField";

import styles from "./Card.module.scss";

const Card = ({ card, index }) => {
  const dispatch = useDispatch();

  const { id, text } = card;

  const handleDeleteCard = () => {
    dispatch(deleteCard(id));
  };

  const handleUpdateCardText = (text) => {
    dispatch(updateCardText({ id: id, text: text }));
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.container}
        >
          <button
            className={styles["delete-button"]}
            onClick={() => handleDeleteCard()}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <div className={styles.description}>
            <EditableField
              actionOnSave={(text) => handleUpdateCardText(text)}
              textDefault={text}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;

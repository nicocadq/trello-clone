import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteCard } from "../../slicers/card";

import styles from "./Card.module.scss";

const Card = ({ card }) => {
  const dispatch = useDispatch();

  const { id, text } = card;

  const handleDeleteCard = () => {
    dispatch(deleteCard(id));
  };

  return (
    <div className={styles.container}>
      <button
        className={styles["delete-button"]}
        onClick={() => handleDeleteCard()}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <div className={styles.description}>{text}</div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;

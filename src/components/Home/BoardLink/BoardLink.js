import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBoard } from "../../../reducers/app";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../Home.module.scss";

const BoardLink = ({ id, title }) => {
  const dispatch = useDispatch();

  const handleDeleteBoard = () => {
    dispatch(deleteBoard(id));
  };

  return (
    <div className={styles["board-link"]}>
      <Link to={`/board/${id}`}> {title} </Link>
      <button onClick={() => handleDeleteBoard()}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

BoardLink.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default BoardLink;

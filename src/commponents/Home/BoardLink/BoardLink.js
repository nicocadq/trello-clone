import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBoard } from "../../../reducers/app";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../Home.module.scss";

const BoardLink = (props) => {
  const dispatch = useDispatch();
  const { id, tittle } = props.board;

  const handleDelteBoard = () => {
    dispatch(deleteBoard(props.board));
  };

  return (
    <div className={styles["board-link"]}>
      <Link to={`/board/${id}`}> {tittle} </Link>
      <button onClick={() => handleDelteBoard()}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default BoardLink;

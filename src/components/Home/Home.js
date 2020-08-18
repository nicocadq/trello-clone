import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBoard } from "../../slicers/boards";
import BoardLink from "./BoardLink";
import AddForm from "../AddForm";

import styles from "./Home.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.app) || {};
  const [isActiveForm, setIsActiveForm] = useState(true);

  const submitAction = (text) => {
    dispatch(addBoard(text));
  };

  const cancelAction = () => {
    setIsActiveForm(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Boards</h2>
      <div className={styles["board-links-wrapper"]}>
        {Object.values(boards).map((board) => (
          <BoardLink key={board.id} id={board.id} title={board.title} />
        ))}
        <div className={styles["add-board-field"]}>
          {isActiveForm ? (
            <AddForm
              buttonText="Add new Board"
              submitAction={(text) => submitAction(text)}
              placeholderText="Type title for new board"
              cancelAction={() => cancelAction()}
            />
          ) : (
            <span onClick={() => setIsActiveForm(true)}>Add new Board</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

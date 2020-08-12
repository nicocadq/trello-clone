import React from "react";
import { useSelector } from "react-redux";
import { addBoard } from "../../slicers/board";
import BoardLink from "./BoardLink";
import EditableField from "../EditableField";

import styles from "./Home.module.scss";

const Home = () => {
  const boards = useSelector((state) => state.boards) || null;

  return (
    <div className={styles.container}>
      <h2 className={styles.tittle}>Boards</h2>
      <div className={styles["board-links-wrapper"]}>
        {Object.entries(boards).map((board) => (
          <BoardLink key={board[0]} id={board[1].id} title={board[1].title} />
        ))}
        <div className={styles["add-board-field"]}>
          <EditableField
            actionOnSave={(text) => addBoard(text)}
            textDefault="Create a new Board"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

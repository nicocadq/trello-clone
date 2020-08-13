import React from "react";
import { useSelector } from "react-redux";
import { addBoard } from "../../reducers/app";
import BoardLink from "./BoardLink";
import EditableField from "../EditableField";

import styles from "./Home.module.scss";

const Home = () => {
  const boards = useSelector((state) => state.app) || {};
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Boards</h2>
      <div className={styles["board-links-wrapper"]}>
        {Object.values(boards).map((board) => (
          <BoardLink key={board.id} id={board.id} title={board.title} />
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

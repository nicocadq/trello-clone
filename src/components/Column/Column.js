import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
// import { deleteColumn } from "../../slicers/column";
import { addCard } from "../../slicers/card";

import styles from "./Column.module.scss";

const Column = ({ id }) => {
  const dispatch = useDispatch();
  const title = "asdasdasd";
  const cards =
    useSelector((state) =>
      Object.values(state.cards).filter((card) => card.columnID === id)
    ) || [];

  const handleClick = () => {
    dispatch(addCard(id));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>{title}</h3>
        </div>
        <div className={styles.cards}>
          {cards.map((card) => (
            <div>{card.id}</div>
          ))}
        </div>
        <div className={styles["add-new-card"]} onClick={handleClick}>
          Add new Card
        </div>
      </div>
    </div>
  );
};

Column.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Column;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DragDropContext } from "react-beautiful-dnd";
import { addColumn } from "../../slicers/column";
import {
  updateCardColumnID,
  updateCardsIndexOnDragEnd,
  updateCardsIndexOnDragStart,
} from "../../slicers/card";
import Column from "../Column";
import AddForm from "../AddForm";

import styles from "./Board.module.scss";

const Board = ({ id }) => {
  const dispatch = useDispatch();

  const columns =
    useSelector((state) =>
      Object.values(state.columns).filter((column) => column.boardID === id)
    ) || [];

  const [isActiveForm, setIsActiveForm] = useState(true);

  const submitAction = (text) => {
    dispatch(addColumn({ boardID: id, text: text }));
    setIsActiveForm(false);
  };

  const cancelAction = () => {
    setIsActiveForm(false);
  };

  const handleClick = () => {
    setIsActiveForm(true);
  };

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(
      updateCardColumnID({
        id: draggableId,
        columnID: destination.droppableId,
      })
    );

    dispatch(
      updateCardsIndexOnDragEnd({
        id: draggableId,
        columnID: destination.droppableId,
        index: destination.index,
      })
    );
  };

  const handleOnDragStart = (result) => {
    const { draggableId } = result;

    dispatch(
      updateCardsIndexOnDragStart({
        id: draggableId,
      })
    );
  };

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
      onDragStart={handleOnDragStart}
    >
      <div className={styles.container}>
        {columns.map((column) => (
          <Column
            key={column.id}
            column={{ id: column.id, title: column.title }}
          />
        ))}
        {isActiveForm ? (
          <AddForm
            buttonText="Add new Column"
            submitAction={(text) => submitAction(text)}
            placeholderText="Type title for new column"
            cancelAction={() => cancelAction()}
          />
        ) : (
          <button className={styles["add-new-column"]} onClick={handleClick}>
            <FontAwesomeIcon className={styles.icon} icon={faPlus} />
            Add new
          </button>
        )}
      </div>
    </DragDropContext>
  );
};

Board.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Board;

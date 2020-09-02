import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DragDropContext } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();

  const dispatch = useDispatch();

  const doesBoardExists = useSelector((state) => state.boards[id]);

  useEffect(() => {
    if (!doesBoardExists) {
      history.push("/");
    }
  });

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

    if (!destination) return;

    const { droppableId, index } = destination;

    const hasPositionChange =
      droppableId === source.droppableId && index === source.index;

    if (hasPositionChange) return;

    dispatch(
      updateCardColumnID({
        id: draggableId,
        columnID: droppableId,
      })
    );

    dispatch(
      updateCardsIndexOnDragEnd({
        id: draggableId,
        columnID: droppableId,
        index: index,
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
        {columns.map(({ id, title }) => (
          <Column key={id} column={{ id: id, title: title }} />
        ))}
        {isActiveForm ? (
          <AddForm
            buttonText="Add new Column"
            submitAction={submitAction}
            placeholderText="Type title for new column"
            cancelAction={cancelAction}
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

import React from "react";
import Board from "../components/Board";
import { useParams } from "react-router-dom";

const BoardPage = () => {
  const { id } = useParams();
  return <Board id={id} />;
};

export default BoardPage;

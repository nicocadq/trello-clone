import React from "react";
import { useParams } from "react-router-dom";
import Board from "../components/Board";
import Header from "../components/Header";

const BoardPage = () => {
  const { id } = useParams();
  return (
    <>
      <Header />
      <Board id={id} />
    </>
  );
};

export default BoardPage;

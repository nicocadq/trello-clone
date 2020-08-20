import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const boardSlice = createSlice({
  name: "boards",
  initialState: {},
  reducers: {
    addBoard(state, action) {
      const newBoard = { id: nanoid(), title: action.payload };
      state[newBoard.id] = newBoard;
    },
    deleteBoard(state, action) {
      const key = action.payload;
      delete state[key];
    },
  },
});

export const { addBoard, deleteBoard } = boardSlice.actions;

export default boardSlice.reducer;

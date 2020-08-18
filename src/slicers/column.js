import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const boardSlice = createSlice({
  name: "columns",
  initialState: {},
  reducers: {
    addColumn(state, action) {
      const boardID = action.payload;
      const newList = { id: nanoid(), boardID: boardID, title: "title" };
      state[newList.id] = newList;
    },
    deleteColumn(state, action) {
      const key = action.payload;
      delete state[key];
    },
  },
});

export const { addColumn, deleteColumn } = boardSlice.actions;

export default boardSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const columnSlice = createSlice({
  name: "columns",
  initialState: {},
  reducers: {
    addColumn(state, action) {
      const newList = {
        id: nanoid(),
        boardID: action.payload.boardID,
        title: action.payload.text,
      };
      state[newList.id] = newList;
    },
    deleteColumn(state, action) {
      const key = action.payload;
      delete state[key];
    },
    updateColumnTitle(state, action) {
      const { id, title } = action.payload;
      state[id].title = title;
    },
  },
});

export const {
  addColumn,
  deleteColumn,
  updateColumnTitle,
} = columnSlice.actions;

export default columnSlice.reducer;

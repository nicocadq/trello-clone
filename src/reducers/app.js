import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const appSlice = createSlice({
  name: "app",
  initialState: {},
  reducers: {
    addBoard(state, action) {
      const newBoard = { id: nanoid(), title: action.payload };
      state[newBoard.id] = newBoard;
    },
    deleteBoard(state, action) {
      const key = action.payload.id;
      delete state[key];
    },
  },
});

export const { addBoard, deleteBoard } = appSlice.actions;

export default appSlice.reducer;

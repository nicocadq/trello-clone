import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const cardSlice = createSlice({
  name: "cards",
  initialState: {},
  reducers: {
    addCard(state, action) {
      const newCard = {
        id: nanoid(),
        columnID: action.payload.columnID,
        text: action.payload.text,
      };
      state[newCard.id] = newCard;
    },
    deleteCard(state, action) {
      const key = action.payload;
      delete state[key];
    },
    updateCardText(state, action) {
      const { id, text } = action.payload;
      state[id].text = text;
    },
  },
});

export const { addCard, deleteCard, updateCardText } = cardSlice.actions;
export default cardSlice.reducer;

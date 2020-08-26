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
        index: action.payload.index,
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
    updateCardColumnID(state, action) {
      const { id, columnID } = action.payload;
      state[id].columnID = columnID;
    },
    updateCardsIndexOnDragEnd(state, action) {
      const { id, index, columnID } = action.payload;
      state[id].index = index;
      Object.values(state)
        .filter((card) => card.columnID === columnID)
        .forEach((card) => {
          if (card.index >= index && card.id !== id) {
            card.index = card.index + 1;
          }
        });
    },
    updateCardsIndexOnDragStart(state, action) {
      const { id } = action.payload;
      const { columnID, index } = state[id];
      Object.values(state)
        .filter((card) => card.columnID === columnID)
        .forEach((card) => {
          if (card.index > index) {
            card.index = card.index - 1;
          }
        });
    },
  },
});

export const {
  addCard,
  deleteCard,
  updateCardText,
  updateCardColumnID,
  updateCardsIndexOnDragEnd,
  updateCardsIndexOnDragStart,
} = cardSlice.actions;
export default cardSlice.reducer;

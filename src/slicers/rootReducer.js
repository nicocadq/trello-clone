import { combineReducers } from "@reduxjs/toolkit";

import boardReducer from "./board";
import columnReducer from "./column";
import cardReducer from "./card";

const rootReducer = combineReducers({
  boards: boardReducer,
  columns: columnReducer,
  cards: cardReducer,
});

export default rootReducer;

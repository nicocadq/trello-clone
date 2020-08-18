import { combineReducers } from "@reduxjs/toolkit";

import boardReducer from "./board";
import columnReducer from "./column";

const rootReducer = combineReducers({
  boards: boardReducer,
  columns: columnReducer,
});

export default rootReducer;

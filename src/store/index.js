import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../slicers/rootReducer";

export default configureStore({
  reducer: rootReducer,
});

import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "@store/feedbackSlice";
import propositionsReducer from "@store/propositionsSlice";
import menuReducer from "@store/menuSlice";
import supplementReducer from "@store/supplementSlice";

export default configureStore({
  reducer: {
    feedback: feedbackReducer,
    propositions: propositionsReducer,
    menu: menuReducer,
    supplement: supplementReducer,
  },
});

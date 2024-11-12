import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "@store/feedbackSlice";
import propositionsReducer from "@store/propositionsSlice";
import menuReducer from "@store/menuSlice";

export default configureStore({
  reducer: {
    feedback: feedbackReducer,
    propositions: propositionsReducer,
    menu: menuReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "@store/feedbackSlice";
import propositionsReducer from "@store/propositionsSlice";
import menuReducer from "@store/menuSlice";
import supplementReducer from "@store/supplementSlice";
import cartReducer from "@store/cartSlice";
import orderReducer from "@store/orderSlice";
import userReducer from "@store/userSlice";
import recommendReducer from "@store/recommendSLice";

export default configureStore({
  reducer: {
    feedback: feedbackReducer,
    propositions: propositionsReducer,
    menu: menuReducer,
    supplement: supplementReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    recommend: recommendReducer,
  },
});

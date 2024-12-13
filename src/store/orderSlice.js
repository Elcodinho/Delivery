import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  handlePending,
  handleFulfilled,
  handleRejected,
} from "@utils/redux/reduxUtils";
import { URL } from "@constants/constants";
const { ORDERSURL } = URL;

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async function (data, { rejectWithValue }) {
    try {
      const response = await fetch(ORDERSURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok)
        return rejectWithValue(
          "Ошибка! Не удалось отправить заказ, попробуйте еще раз"
        );
    } catch (error) {
      if (error.message === "Failed to fetch") {
        return rejectWithValue(
          "Ошибка! Не удалось отправить заказ, попробуйте еще раз"
        );
      }
    }
  }
);

const initialState = {
  orders: [],
  status: null,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null; // Сбрасываем ошибку
    },
    clearOrderStatus: (state) => {
      state.status = null; // Сбрасываем статус
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, handlePending)
      .addCase(addOrder.fulfilled, handleFulfilled);
    handleRejected(builder, addOrder);
  },
});
export const { clearOrderError, clearOrderStatus } = orderSlice.actions;
export const selectOrder = (state) => state.order.order;
export default orderSlice.reducer;

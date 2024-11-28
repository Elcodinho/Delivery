import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

// Универсальная функция обработки ошибок
const handleRejected = (builder, asyncThunk) => {
  builder.addCase(asyncThunk.rejected, (state, action) => {
    state.status = "rejected";
    state.error = action.payload || action.error.message;
  });
};

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
      .addCase(addOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state) => {
        state.status = "resolved";
        state.error = null;
      });
    handleRejected(builder, addOrder);
  },
});
export const { clearOrderError, clearOrderStatus } = orderSlice.actions;
export const selectOrder = (state) => state.order.order;
export default orderSlice.reducer;

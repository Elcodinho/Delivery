import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "@constants/constants";
import {
  handlePending,
  handleFulfilled,
  handleRejected,
} from "@utils/redux/reduxUtils";
const { SUGGESTIONSURL } = URL;

// Функция отправки новых отзывов и предложений(propositions)
export const addProposition = createAsyncThunk(
  "propositions/addProposition",
  async function (data, { rejectWithValue }) {
    try {
      const response = await fetch(SUGGESTIONSURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok)
        return rejectWithValue(
          "Ошибка! Не удалось отправить отзыв, попробуйте позже"
        );
    } catch (error) {
      if (error.message === "Failed to fetch") {
        return rejectWithValue("Ошибка! Не удалось выполнить запрос");
      }
    }
  }
);

// Начальное стостояние массива
const initialState = {
  propositions: [],
  status: null,
  error: null,
};

export const propositionsSlice = createSlice({
  name: "propositions",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null; // Сбрасываем ошибку
    },
    clearStatus: (state) => {
      state.status = null; // Сбрасываем статус
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProposition.pending, handlePending)
      .addCase(addProposition.fulfilled, handleFulfilled);
    handleRejected(builder, addProposition);
  },
});
export const { clearError, clearStatus } = propositionsSlice.actions;
export default propositionsSlice.reducer;

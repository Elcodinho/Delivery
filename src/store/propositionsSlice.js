import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "@constants/constants";

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

// Универсальная функция обработки ошибок
const handleRejected = (builder, asyncThunk) => {
  builder.addCase(asyncThunk.rejected, (state, action) => {
    state.status = "rejected";
    state.error = action.payload || action.error.message;
  });
};

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
      .addCase(addProposition.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addProposition.fulfilled, (state) => {
        state.status = "resolved";
        state.error = null;
      });
    handleRejected(builder, addProposition);
  },
});
export const { clearError, clearStatus } = propositionsSlice.actions;
export default propositionsSlice.reducer;

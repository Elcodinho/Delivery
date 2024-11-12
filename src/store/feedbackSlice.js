import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "@constants/constants";

const { FEEDBACKURL } = URL;

//Функция получения отзывов
export const getFeedback = createAsyncThunk(
  "feedback/getFeetback",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(FEEDBACKURL);
      if (!response.ok) {
        return rejectWithValue("Ошибка: Не удалось получить список отзывов");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Ошибка: Не удалось получить список отзывов");
    }
  }
);

// Функция добавления отзывовов
export const addFeedback = createAsyncThunk(
  "feedback/addFeedback",
  async function () {}
);
// Функция удаления отзывов
export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async function () {}
);
// Функция редактирования отзывов
export const editFeedback = createAsyncThunk(
  "feedback/editFeedback",
  async function () {}
);

// Универсальная функция обработки ошибок
const handleRejected = (builder, asyncThunk) => {
  builder.addCase(asyncThunk.rejected, (state, action) => {
    state.status = "rejected";
    state.error = action.payload || action.error.message;
  });
};

// Начальное заначение массива отзывов
const initialState = {
  feedback: [],
  status: null,
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedback.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getFeedback.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.feedback = action.payload;
      });
    handleRejected(builder, getFeedback);
  },
});

export const selectFeedback = (state) => state.feedback.feedback;
export default feedbackSlice.reducer;

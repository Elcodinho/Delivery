import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "@constants/constants";
import {
  handlePending,
  handleFulfilled,
  handleRejected,
} from "@utils/redux/reduxUtils";
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
  async function (data, { rejectWithValue }) {
    try {
      const response = await fetch(FEEDBACKURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        return rejectWithValue(
          "Ошибка! Не удалось добавить отзыв, попробуйте еще раз"
        );
      }
    } catch (error) {
      if (error.message === "Failed to fetch") {
        return rejectWithValue(
          "Ошибка! Не удалось добавить отзыв, попробуйте еще раз"
        );
      }
    }
  }
);
// Функция удаления отзывов
export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch(`${FEEDBACKURL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        return rejectWithValue(
          "Ошибка! Не удалось удалить отзыв, попробуйте еще раз"
        );
      }
    } catch (error) {
      if (error.message === "Failed to fetch") {
        return rejectWithValue(
          "Ошибка! Не удалось удалить отзыв, попробуйте еще раз"
        );
      }
    }
  }
);

// Начальное заначение массива отзывов
const initialState = {
  feedback: [],
  status: null,
  error: null,
  deleteStatus: null,
  deleteError: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    clearFeedbackError: (state) => {
      state.error = null; // Сбрасываем ошибку
    },
    clearFeedbackStatus: (state) => {
      state.status = null; // Сбрасываем статус
    },
    clearDeleteFeedbackError: (state) => {
      state.deleteError = null; // Сбрасываем ошибку
    },
    clearDeleteFeedbackStatus: (state) => {
      state.deleteStatus = null; // Сбрасываем статус
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedback.pending, handlePending)
      .addCase(getFeedback.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.feedback = action.payload;
      })
      .addCase(addFeedback.pending, handlePending)
      .addCase(addFeedback.fulfilled, handleFulfilled)
      .addCase(deleteFeedback.pending, (state) => {
        state.deleteError = null;
        state.deleteStatus = "loading";
      })
      .addCase(deleteFeedback.fulfilled, (state) => {
        state.deleteError = null;
        state.deleteStatus = "resolved";
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.deleteStatus = "rejected";
        state.deleteError = action.payload || action.error.message;
      });
    handleRejected(builder, getFeedback);
    handleRejected(builder, addFeedback);
  },
});

export const {
  clearFeedbackError,
  clearFeedbackStatus,
  clearDeleteFeedbackError,
  clearDeleteFeedbackStatus,
} = feedbackSlice.actions;
export const selectFeedback = (state) => state.feedback.feedback;
export default feedbackSlice.reducer;

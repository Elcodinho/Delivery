import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  handlePending,
  handleRejected,
  handleFulfilled,
} from "@utils/redux/reduxUtils";
import { URL } from "@constants/constants";
const { SUPPLEMENTSURL } = URL;

//Функция получения добавок
export const getSupplement = createAsyncThunk(
  "supplement/getSupplement",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(SUPPLEMENTSURL);
      if (!response.ok) {
        return rejectWithValue(
          "Ошибка: Не удалось получить список ингредиентов"
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Ошибка: Не удалось получить список ингредиентов");
    }
  }
);

// Функция добавления добавок
export const addSupplement = createAsyncThunk(
  "supplement/addSupplement",
  async function (data, { rejectWithValue }) {
    try {
      const checkResponse = await fetch(`${SUPPLEMENTSURL}/${data.id}`);

      if (checkResponse.ok) {
        return rejectWithValue("Ошибка! Добавка с таким id уже существует.");
      }

      if (checkResponse.status !== 404) {
        return rejectWithValue(
          "Ошибка! Не удалось проверить существование добавки."
        );
      }

      // Шаг 2: Добавляем новую добавку, если её нет
      const postResponse = await fetch(SUPPLEMENTSURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!postResponse.ok) {
        return rejectWithValue("Ошибка! Не удалось добавить доп. ингредиент.");
      }
    } catch (error) {
      if (error.message === "Failed to fetch") {
        return rejectWithValue("Ошибка! Не удалось выполнить запрос");
      }
      return rejectWithValue("Ошибка! Не удалось добавить доп. ингредиент.");
    }
  }
);

export const deleteSupplement = createAsyncThunk(
  "supplement/addSupplement",
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch(`${SUPPLEMENTSURL}/${id}`, {
        method: "DELETE",
      });

      // Проверка на 404
      if (response.status === 404) {
        return rejectWithValue("Ошибка! Добавка с таким ID не найдена");
      }
      if (!response.ok) {
        return rejectWithValue("Ошибка! Не удалось удалить добавку");
      }
    } catch (error) {
      if (error.message === "Failed to fetch") {
        return rejectWithValue("Ошибка! Не удалось выполнить запрос");
      }

      return rejectWithValue("Ошибка! Не удалось удалить добавку");
    }
  }
);

const initialState = {
  supplement: [],
  status: null,
  error: null,
  deleteStatus: null,
  deleteError: null,
};

const supplementSlice = createSlice({
  name: "supplement",
  initialState,
  reducers: {
    clearSupError: (state) => {
      state.error = null; // Сбрасываем ошибку
    },
    clearSupStatus: (state) => {
      state.status = null; // Сбрасываем статус
    },
    clearDeleteSupError: (state) => {
      state.deleteError = null; // Сбрасываем ошибку
    },
    clearDeleteSupStatus: (state) => {
      state.deleteStatus = null; // Сбрасываем статус
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSupplement.pending, handlePending)
      .addCase(getSupplement.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.supplement = action.payload;
      })
      .addCase(addSupplement.pending, handlePending)
      .addCase(addSupplement.fulfilled, handleFulfilled);
    handleRejected(builder, getSupplement);
    handleRejected(builder, addSupplement);
  },
});

export const {
  clearDeleteSupError,
  clearDeleteSupStatus,
  clearSupError,
  clearSupStatus,
} = supplementSlice.actions;
export const selectSupplement = (state) => state.supplement.supplement;
export default supplementSlice.reducer;

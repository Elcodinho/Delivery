import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  handlePending,
  handleFulfilled,
  handleRejected,
} from "@utils/redux/reduxUtils";
import { URL } from "@constants/constants";
const { MENUURL } = URL;

// Функция получения меню
export const getMenu = createAsyncThunk(
  "menu/getMenu",
  async function (
    { category = "sushi-i-rolli", type, slug },
    { rejectWithValue }
  ) {
    // Url формируется на основе slug, либо category и type(необязательный параметр)
    const url = slug
      ? `${MENUURL}?slug=${slug}`
      : `${MENUURL}?category=${category}${type ? `&type=${type}` : ""}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return rejectWithValue(
          "Ошибка: Не удалось получить список товаров, попробуйте позже"
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        "Ошибка: Не удалось получить список товаров, попробуйте позже"
      );
    }
  }
);

// Функция проверки уникальности slug
export const checkSlugUnique = createAsyncThunk(
  "menu/checkSlugUnique",
  async function (slug, { rejectWithValue }) {
    try {
      const response = await fetch(`${MENUURL}?slug=${slug}`);
      const data = await response.json();
      if (data.length > 0) {
        throw new Error("Этот slug уже используется");
      }
      return "Уникальный slug";
    } catch (error) {
      if (error.message === "Failed to fetch") {
        return rejectWithValue("Ошибка проверки slug");
      }
      return rejectWithValue(error.message);
    }
  }
);

// Функция добавления товара в меню
export const addMenuItem = createAsyncThunk(
  "menu/addMenuItem",
  async function (item, { rejectWithValue, dispatch }) {
    try {
      // Проверяем уникальность slug
      await dispatch(checkSlugUnique(item.slug)).unwrap();

      // Если slug уникален, добавляем товар
      const response = await fetch(MENUURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        return rejectWithValue(
          "Ошибка добавления, товар с таким slug уже существует"
        );
      }
    } catch (error) {
      return rejectWithValue(
        "Ошибка добавления, товар с таким slug уже существует"
      );
    }
  }
);

// Функция удаления товара из меню
export const deleteMenuItem = createAsyncThunk(
  "menu/deleteMenuItem",
  async function (slug, { rejectWithValue }) {
    try {
      // Сначала находим товар по slug
      const response = await fetch(`${MENUURL}?slug=${slug}`);
      if (!response.ok) {
        throw new Error("Ошибка при поиске товара по slug");
      }

      const data = await response.json();
      const item = data.find((product) => product.slug === slug);

      if (!item) {
        throw new Error("Товар с таким slug не найден.");
      }

      // Если товар найден, удаляем его по id
      const deleteResponse = await fetch(`${MENUURL}/${item.id}`, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        throw new Error("Ошибка! Не удалось удалить товар.");
      }
    } catch (error) {
      if (error.message === "Failed to fetch") {
        return rejectWithValue("Ошибка! Не удалось удалить товар.");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const editMenuItem = createAsyncThunk(
  "menu/editMenuItem",
  async function ({ slug, value }, { rejectWithValue }) {
    try {
      // Шаг 1: Получить товар по slug
      const responseGet = await fetch(`${MENUURL}?slug=${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!responseGet.ok) {
        if (responseGet.status === 404) {
          return rejectWithValue("Ошибка! Товар с таким slug не найден.");
        }
        return rejectWithValue("Ошибка! Не удалось найти товар по slug.");
      }

      const [product] = await responseGet.json(); // Предполагаем, что сервер возвращает массив товаров
      if (!product || !product.id) {
        return rejectWithValue("Ошибка! Товар с таким slug не найден.");
      }

      const { id } = product;

      // Шаг 2: Обновить статус товара по id
      const responsePatch = await fetch(`${MENUURL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ disabled: value }),
      });

      if (!responsePatch.ok) {
        return rejectWithValue("Ошибка! Не удалось изменить статус товара.");
      }

      return { id, disabled: value }; // Возвращаем данные для успешного результата
    } catch (error) {
      return rejectWithValue("Ошибка! Не удалось изменить статус товара.");
    }
  }
);

const initialState = {
  menu: [],
  status: null,
  error: null,
  deleteStatus: null,
  deleteError: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    clearMenuError: (state) => {
      state.error = null; // Сбрасываем ошибку
    },
    clearMenuStatus: (state) => {
      state.status = null; // Сбрасываем статус
    },
    clearDeleteMenuStatus: (state) => {
      state.deleteStatus = null; // Сбрасываем статус
    },
    clearDeleteMenuError: (state) => {
      state.deleteError = null; // Сбрасываем статус
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenu.pending, handlePending)
      .addCase(getMenu.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.menu = action.payload;
      })
      .addCase(addMenuItem.pending, handlePending)
      .addCase(addMenuItem.fulfilled, handleFulfilled)
      .addCase(deleteMenuItem.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteMenuItem.fulfilled, (state) => {
        state.deleteStatus = "resolved";
        state.deleteError = null;
      })
      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.deleteStatus = "rejected";
        state.deleteError = action.payload || action.error.message;
      })
      .addCase(editMenuItem.pending, handlePending)
      .addCase(editMenuItem.fulfilled, handleFulfilled);
    handleRejected(builder, getMenu);
    handleRejected(builder, addMenuItem);
    handleRejected(builder, editMenuItem);
  },
});
export const {
  clearMenuError,
  clearMenuStatus,
  clearDeleteMenuError,
  clearDeleteMenuStatus,
} = menuSlice.actions;
export const selectMenu = (state) => state.menu.menu;
export default menuSlice.reducer;

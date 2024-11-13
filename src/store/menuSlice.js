import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

// Универсальная функция обработки ошибок
const handleRejected = (builder, asyncThunk) => {
  builder.addCase(asyncThunk.rejected, (state, action) => {
    state.status = "rejected";
    state.error = action.payload || action.error.message;
  });
};

const initialState = {
  menu: [],
  status: null,
  error: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenu.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.menu = action.payload;
      });
    handleRejected(builder, getMenu);
  },
});
export const selectMenu = (state) => state.menu.menu;
export default menuSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "@constants/constants";
const SUPPLEMENTSURL = URL.SUPPLEMENTSURL;

//Функция получения добавок
export const getSupplement = createAsyncThunk(
  "supplement/getSupplement",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(SUPPLEMENTSURL);
      if (!response.ok) {
        return rejectWithValue(
          "Ошибка: Не удалось получить список ингридиентов"
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Ошибка: Не удалось получить список ингридиентов");
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
  supplement: [],
  status: null,
  error: null,
};

const supplementSlice = createSlice({
  name: "supplement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSupplement.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSupplement.fulfilled, (state, action) => {
        state.status = "resolved";
        state.error = null;
        state.supplement = action.payload;
      });
    handleRejected(builder, getSupplement);
  },
});

export const selectSupplement = (state) => state.supplement.supplement;
export default supplementSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  handlePending,
  handleFulfilled,
  handleRejected,
} from "@utils/redux/reduxUtils";
import { URL } from "@constants/constants";
const { MENUURL, RECURL } = URL;

// Функция добавления рекомендованных товаров
export const setRecommendedItems = createAsyncThunk(
  "recommend/setRecommendedItems",
  async function (slugs, { rejectWithValue, dispatch }) {
    try {
      // 1. Получаем текущие товары с RECURL с помощью функции getRecommendItems
      const currentItems = await dispatch(getRecommendItems()).unwrap();
      const existingSlugs = currentItems.map((item) => item.slug);

      // 2. Создаем массив промисов, по одному для каждого элемента в массиве slugs
      const requests = slugs.map(async (slug) => {
        const response = await fetch(`${MENUURL}?slug=${slug}`);
        if (!response.ok) {
          throw new Error("Ошибка, не удалось загрузить товар");
        }
        const data = await response.json();
        return data;
      });

      // Ждем завершения всех запросов
      const results = await Promise.all(requests);
      const combinedResults = results.flat();

      // 3. Фильтруем товары, которые уже существуют по slug
      const uniqueResults = combinedResults.filter(
        (item) => !existingSlugs.includes(item.slug)
      );

      if (uniqueResults.length === 0) {
        throw new Error(
          "Товар(ы) с таким slug не существует или уже добавлен в рекомендованные"
        );
      }

      // 4. Добавляем каждый товар как отдельный объект на RECURL
      const addRequests = uniqueResults.map(({ disabled, ...item }) =>
        fetch(RECURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item), // Отправляем каждый товар отдельно
        })
      );

      // Ждем завершения всех запросов на добавление
      const addResponses = await Promise.all(addRequests);

      // Проверяем, что все запросы прошли успешно
      if (addResponses.some((response) => !response.ok)) {
        throw new Error("Ошибка при добавлении одного или нескольких товаров");
      }
    } catch (error) {
      if (error.message === "Failed to fetch") {
        return rejectWithValue("Ошибка при обновлении рекомендуемых товаров");
      }
      return rejectWithValue(error.message);
    }
  }
);

// Функция получения рекомендованных товаров
export const getRecommendItems = createAsyncThunk(
  "recommend/getRecommendItems",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(RECURL);
      if (!response.ok) {
        return rejectWithValue(
          "Ошибка! Не удалось загрузить рекомендуемые товары"
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        "Ошибка! Не удалось загрузить рекомендуемые товары"
      );
    }
  }
);

// Функция удаления товара из рекомендованных
export const deleteRecommendItems = createAsyncThunk(
  "recommend/deleteRecommendItems",
  async function (slug, { rejectWithValue }) {
    try {
      // Сначала находим товар по slug
      const response = await fetch(`${RECURL}?slug=${slug}`);
      if (!response.ok) {
        throw new Error("Ошибка при поиске товара по slug");
      }

      const data = await response.json();
      const item = data.find((product) => product.slug === slug);

      if (!item) {
        throw new Error(
          "Товар с таким slug не найден в списке рекомендованных."
        );
      }

      // Если товар найден, удаляем его по id
      const deleteResponse = await fetch(`${RECURL}/${item.id}`, {
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

const initialState = {
  items: [],
  status: null,
  error: null,
  getStatus: null,
  getError: null,
  deleteStatus: null,
  deleteError: null,
};

export const recommendSlice = createSlice({
  name: "recommend",
  initialState,
  reducers: {
    clearRecommendError: (state) => {
      state.error = null; // Сбрасываем ошибку
    },
    clearRecommendStatus: (state) => {
      state.status = null; // Сбрасываем статус
    },
    clearDeleteRecommendError: (state) => {
      state.deleteError = null; // Сбрасываем ошибку
    },
    clearDeleteRecommendStatus: (state) => {
      state.deleteStatus = null; // Сбрасываем статус
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setRecommendedItems.pending, handlePending)
      .addCase(setRecommendedItems.fulfilled, handleFulfilled)
      .addCase(getRecommendItems.pending, (state) => {
        state.getStatus = "loading";
        state.getError = null;
      })
      .addCase(getRecommendItems.fulfilled, (state, action) => {
        state.getStatus = "resolved";
        state.getError = null;
        state.items = action.payload;
      })
      .addCase(getRecommendItems.rejected, (state, action) => {
        state.getStatus = "rejected";
        state.getError = action.payload;
      })
      .addCase(deleteRecommendItems.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteRecommendItems.fulfilled, (state) => {
        state.deleteStatus = "resolved";
        state.deleteError = null;
      })
      .addCase(deleteRecommendItems.rejected, (state, action) => {
        state.deleteStatus = "rejected";
        state.deleteError = action.payload;
      });
    handleRejected(builder, setRecommendedItems);
  },
});

export const {
  clearRecommendError,
  clearRecommendStatus,
  clearDeleteRecommendError,
  clearDeleteRecommendStatus,
} = recommendSlice.actions;
export default recommendSlice.reducer;
export const recommendedItems = (state) => state.recommend.items;

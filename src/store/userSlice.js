import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    token: null,
    id: null,
    isLoading: true, // Флаг загрузки
  },
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isLoading = false; // Обновляем флаг после загрузки
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.isLoading = false; // Сбрасываем флаг при выходе
    },
    startLoading(state) {
      state.isLoading = true; // Устанавливаем флаг загрузки
    },
  },
});

export const { setUser, removeUser, startLoading } = userSlice.actions;
export const userSelect = (state) => state.user;
export default userSlice.reducer;

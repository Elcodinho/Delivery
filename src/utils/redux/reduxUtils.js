// Универсальная функция для обработки pending
export const handlePending = (state) => {
  state.status = "loading";
  state.error = null;
};

// Универсальная функция для обработки fulfilled
export const handleFulfilled = (state) => {
  state.status = "resolved";
  state.error = null;
};

// Универсальная функция для обработки rejected
export const handleRejected = (builder, asyncThunk) => {
  builder.addCase(asyncThunk.rejected, (state, action) => {
    state.status = "rejected";
    state.error = action.payload || action.error.message;
  });
};

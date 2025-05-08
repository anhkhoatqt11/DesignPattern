import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    // Add other reducers if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

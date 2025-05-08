import { configureStore } from "@reduxjs/toolkit";

// Add your reducers here
const reducer = {
  // Add reducers here, e.g., auth: authReducer
};

let store: ReturnType<typeof configureStore> | null = null;

export function getStore() {
  if (!store) {
    store = configureStore({ reducer });
  }
  return store;
}

export type RootState = ReturnType<ReturnType<typeof getStore>["getState"]>;
export type AppDispatch = ReturnType<typeof getStore>["dispatch"];
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "@/services/api";
import authReducer from "./slices/authStateSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(api.middleware)
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

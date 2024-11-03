import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
import { apiSlice } from "../features/dogs/dogsSlice";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";

const appReducers = {
   todos: todoReducer,
   [apiSlice.reducerPath]: apiSlice.reducer,
};

export const store = configureStore({
   reducer: appReducers,
   middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiSlice.middleware);
   },
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
   ThunkReturnType,
   RootState,
   unknown,
   Action
>;

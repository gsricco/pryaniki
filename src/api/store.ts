import { configureStore } from '@reduxjs/toolkit';
import {pryanikApi} from "./pryanikApi";

export const store = configureStore({
  reducer: {
    [pryanikApi.reducerPath]: pryanikApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pryanikApi.middleware),
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

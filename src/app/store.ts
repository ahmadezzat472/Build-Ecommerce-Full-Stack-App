import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { productApiSlice } from "./services/productsSlice";
import loginSlice from "./features/loginSlice";
import cartSlice from "./features/cartSlice";
import globalSlice from "./features/globalSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import networkSlice from "./features/networkSlice";
import { categoryApiSlice } from "./services/CategorySlice";

// Redux Persist configuration
const persistConfig = {
  key: "cart", // Key to store data in storage
  storage, // Storage mechanism (localStorage, etc.)
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, cartSlice);

export const store = configureStore({
  reducer: {
    Network: networkSlice,
    Global: globalSlice,
    Cart: persistedReducer,
    Login: loginSlice,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApiSlice.middleware, categoryApiSlice.middleware),
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;

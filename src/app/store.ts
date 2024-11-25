import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { productApiSlice } from './features/products/productsSlice';

export const store = configureStore({
    reducer: {
        [productApiSlice.reducerPath]: productApiSlice.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(productApiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
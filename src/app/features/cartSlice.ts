import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { IProduct } from '../../interfaces';

interface IInitialState {
    cartItems : IProduct[]
}

const initialState: IInitialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems = [...state.cartItems, action.payload]
        }
    }
})

export const {addToCart} = cartSlice.actions;
export const selectCart = ({Cart}: RootState) => Cart
export default cartSlice.reducer;

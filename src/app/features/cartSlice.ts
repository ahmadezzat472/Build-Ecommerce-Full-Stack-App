import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { addItemToCart } from '../../utils';

export interface ICartProducts {
    id: number;
    quantity: number;
    documentId: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    category: {
        title: string;
    };
    thumbnail: {
        url: string;
    };
} 

interface IInitialState {
    cartItems : ICartProducts[]
}

const initialState: IInitialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems = addItemToCart(action.payload, state.cartItems)
            console.log(state.cartItems);
            
        }
    }
})

export const {addToCart} = cartSlice.actions;
export const selectCart = ({Cart}: RootState) => Cart
export default cartSlice.reducer;

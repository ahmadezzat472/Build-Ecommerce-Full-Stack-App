import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { addItemToCart, clearItemsFromCart, removeItemFromCart } from '../../utils';

export interface ICartProducts {
    id: number;
    name: string;
    description: string;
    price: number;
    avaliableItems: number;
    defaultImage: {
        url: string;
    }
    category: {
        image: {
            url: string;
        }
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
        },

        removeFromCart: (state, action) => {
            state.cartItems = removeItemFromCart(action.payload, state.cartItems)            
        },

        clearCart: (state) => {
            state.cartItems = clearItemsFromCart()            
        }
    }
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export const selectCart = ({Cart}: RootState) => Cart
export default cartSlice.reducer;

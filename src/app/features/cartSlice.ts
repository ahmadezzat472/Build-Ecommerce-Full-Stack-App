import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {

}

const initialState = {
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

const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;

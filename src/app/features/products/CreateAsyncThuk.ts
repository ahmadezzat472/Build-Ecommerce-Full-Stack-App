import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IProduct } from '../../../interfaces'
import axiosInstance from '../../../config/axios.config';

interface IInitialState {
    data: IProduct[];
    loading: boolean
    error: unknown 
}

const initialState: IInitialState = {
    data: [],
    loading: true,
    error: null,
}


// First, create the thunk
export const getProductList = createAsyncThunk("products/productsSlice", async(_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try{
        const response = await axiosInstance.get("/products?populate=*");
        console.log(response);
        
        return response.data.data;
    } catch(error) {        
        return rejectWithValue(error);
    }
})

const productsSlice = createSlice({
    name: 'products', 
    initialState,   
    reducers: {},
    extraReducers: (builder) => {
        // ** pending
        builder.addCase(getProductList.pending, (state) => {
            state.loading = true;
        })

        // ** fulfilled = success
        builder.addCase(getProductList.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })

        // ** rejected
        builder.addCase(getProductList.rejected, (state, action) => {
            state.loading = false;
            state.data = []
            state.error = action.payload;
        })
        
    }
})

export default productsSlice.reducer;
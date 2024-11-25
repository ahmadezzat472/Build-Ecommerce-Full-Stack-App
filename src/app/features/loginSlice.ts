import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../config/axios.config';
import { createStandaloneToast } from '@chakra-ui/react';
import cookieService from '../../services/cookieService';

const {toast} = createStandaloneToast()

interface IUser {
    identifier: string;
    password: string;
}

interface IError {
    response: {
        data: {
            error: {
                message: string;
            };
        };
    };
}

interface IInitialState {
    data: null;
    loading: boolean
    error: unknown 
}

const initialState: IInitialState = {
    data: null,
    loading: false,
    error: null,
}

// First, create the thunk
export const userLogin = createAsyncThunk< null/* The returned value (success case)*/, IUser /*The argument type*/, { rejectValue: IError } /*The rejected value type*/>
    ("products/productsSlice", async(user: IUser, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try{
            const response = await axiosInstance.post("/auth/local", user);
            console.log(response.data);
            return response.data;
        } catch(error) {        
            return rejectWithValue(error as IError);
        }
})

const loginSlice = createSlice({
    name: 'Login', 
    initialState,   
    reducers: {},
    extraReducers: (builder) => {
        // ** pending
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
        })

        // ** fulfilled = success
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;

            // ** Cookies
            const date = new Date()
            const IN_DAYS = 3;
            const IN_HOURS = 1000 * 60 * 60 * 24;
            const EXPIRES_IN_Days = IN_DAYS * IN_HOURS;
            date.setTime(date.getTime() + EXPIRES_IN_Days) 
            const options = {path: "/", expires: date}
            cookieService.set("jwt", action?.payload?.jwt, options)
            
            toast({
                title: 'Logged in Successfully',
                description: "We've created your account for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        })

        // ** rejected
        builder.addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.data = null
            state.error = action.payload;

            toast({
                title: action?.payload?.response.data.error.message || "Unknown error",
                description: "try again.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }
})

export default loginSlice.reducer;
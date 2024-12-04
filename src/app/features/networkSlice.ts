import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

interface IInitialState {
    isOnline: boolean;
}

const initialState: IInitialState = {
    isOnline: true,
}

const networkSlice = createSlice({
    name: "Network",
    initialState,
    reducers: {
        networkMode: (state, action) => {
            state.isOnline = action.payload;
        },
    }
})

export const {networkMode} = networkSlice.actions;
export const selectNetwork = ({Network}: RootState) => Network
export default networkSlice.reducer;

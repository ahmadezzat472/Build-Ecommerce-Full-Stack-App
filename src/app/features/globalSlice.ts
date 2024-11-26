import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

interface IInitialState {
    isOpenCartDrawer: boolean;
    // onOpenCartDrawer: boolean;
    // onCloseCartDrawer: boolean;
}

const initialState: IInitialState = {
    isOpenCartDrawer: false,
    // onOpenCartDrawer: false,
    // onCloseCartDrawer: true,
}

const globalSlice = createSlice({
    name: "Global",
    initialState,
    reducers: {
        isOpenCartDrawerAction: (state) => {
            // state.onOpenCartDrawer = true;
            state.isOpenCartDrawer = !state.isOpenCartDrawer;
        },

        // onOpenCartDrawerAction: (state) => {
        //     state.onOpenCartDrawer = true;
        //     state.isOpenCartDrawer = true;
        // },

        // onCloseCartDrawerAction: (state) => {
        //     state.onCloseCartDrawer = false;
        //     state.isOpenCartDrawer = false;
        // }
    }
})

export const {isOpenCartDrawerAction} = globalSlice.actions;
export const selectGlobal = ({Global}: RootState) => Global
export default globalSlice.reducer;

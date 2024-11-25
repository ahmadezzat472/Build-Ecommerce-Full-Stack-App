import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IClickedFile {
    fileName: string;
    fileContent: string | undefined;
    id: string
}

interface IInitialState {
    clickedFile: IClickedFile
}

const initialState: IInitialState = {
    clickedFile: {
        fileName: "",
        fileContent: "",
        id: "",
    },
}

const fileTreeSlice = createSlice({
    name: 'fileTree', 
    initialState,   
    reducers: {


        setClickedFileAction: (state, actionPayload: PayloadAction<IClickedFile>) => {
            state.clickedFile = actionPayload.payload
        }
    }
})

export const { setClickedFileAction} = fileTreeSlice.actions;

export default fileTreeSlice.reducer;
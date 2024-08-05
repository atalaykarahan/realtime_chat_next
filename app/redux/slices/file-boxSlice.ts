import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface FileItemSliceModel {
    fileBoxStatus: boolean;
    name: string;
    size: number;
    type?: string;
}

interface InitialState {
    value: FileItemSliceModel;
}

export const fileBox = createSlice({
    name: "file-box",
    initialState: {
        value: {
            fileBoxStatus: false,
        } as FileItemSliceModel,
    } as InitialState,
    reducers: {
        openFileBox: (state, action: PayloadAction<FileItemSliceModel>) => {
            state.value = action.payload;
        },
        closeFileBox: (state) => {
            //kapanirken icini bosaltiyoruz.
            state.value = {
                fileBoxStatus: false,
                name: "",
                size: 0,
                type: "",
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const {openFileBox, closeFileBox} = fileBox.actions;

export default fileBox.reducer;

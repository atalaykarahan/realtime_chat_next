import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserSliceModel {
    id: string
    name: string
    mail: string
    image: string
    role: string
}

interface InitialState {
    value: UserSliceModel
}

const initialState: InitialState = {
    value: {
        id: "",
        name: "",
        mail: "",
        image: "",
        role: "",
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserSliceModel>) => {
            state.value = action.payload;
        },
        clearUser: (state) => {
            state.value = initialState.value;
        },
    }
})

// Reducer fonksiyonlarını export et
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

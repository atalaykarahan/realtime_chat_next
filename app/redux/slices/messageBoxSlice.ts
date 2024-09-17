import {Message} from "@/models/Message";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface MessageItemSliceModel {
    activeComponent?: string
    other_user_email: string;
    other_user_name: string;
    other_user_photo: string;
    room_id: string;
    friend_status: string;
    messages?: Message[];
}

interface InitialState {
    value: MessageItemSliceModel;
}

export const messageBox = createSlice({
    name: "message-box",
    initialState: {
        value: {
            activeComponent: "friends",
            other_user_email: "",
            other_user_name: "",
            other_user_photo: "",
            friend_status: "",
            room_id: "",
            messages: [],
        } as MessageItemSliceModel,
    } as InitialState,
    reducers: {
        openChatBox: (state, action: PayloadAction<MessageItemSliceModel>) => {
            state.value = action.payload;
        },
        showProfile: (state) => {
            state.value = {
                ...state.value,
                activeComponent: "profile",  
            };
        },
        showFriends: (state) => {
            state.value = {
                ...state.value,
                activeComponent: "friends",  
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const {openChatBox, showProfile,showFriends } = messageBox.actions;

export default messageBox.reducer;

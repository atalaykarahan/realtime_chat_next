import {Message} from "@/models/Message";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface MessageItemSliceModel {
    chatBoxStatus: boolean;
    other_user_email: string;
    other_user_name: string;
    other_user_photo: string;
    room_id: string;
    messages?: Message[];
}

interface InitialState {
    value: MessageItemSliceModel;
}

export const messageBox = createSlice({
    name: "message-box",
    initialState: {
        value: {
            chatBoxStatus: false,
            other_user_email: "",
            other_user_name: "",
            other_user_photo: "",
            room_id: "",
            messages: [],
        } as MessageItemSliceModel,
    } as InitialState,
    reducers: {
        openChatBox: (state, action: PayloadAction<MessageItemSliceModel>) => {
            state.value = action.payload;
        },
        closeChatBox: (state) => {
            state.value = {
                ...state.value,
                chatBoxStatus: false,
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const {openChatBox, closeChatBox} = messageBox.actions;

export default messageBox.reducer;

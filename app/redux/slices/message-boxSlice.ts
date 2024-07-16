import { Message } from "@/models/Message";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface  MessageItemModel {
  chatBoxStatus: boolean;
  other_user_email: string;
  other_user_name: string;
  other_user_photo: string;
  messages: Message[];
}

interface InitialState {
  value: MessageItemModel;
}

export const messageBox = createSlice({
  name: "message-box",
  initialState: {
    value: {
      chatBoxStatus: false,
      other_user_email: "",
      other_user_name: "",
      other_user_photo: "",
      messages: [],
    } as MessageItemModel,
  } as InitialState,
  reducers: {
    openChatBox: (state, action: PayloadAction<MessageItemModel>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openChatBox } = messageBox.actions;

export default messageBox.reducer;
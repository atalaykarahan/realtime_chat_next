import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MessageItemModel {
  room_id: string;
  last_message: string;
  updatedAt: string;
  user_name: string;
  user_photo: string;
  user_email: string;
  friend_status: string;
}

interface ChatListState {
  messages: MessageItemModel[]; // `null` yerine `MessageItemModel[]` olarak tanımlandı
}

const initialState: ChatListState = {
  messages: [],
};

const chatListSlice = createSlice({
  name: 'messageBox',
  initialState,
  reducers: {
    setChatList: (state, action: PayloadAction<MessageItemModel[]>) => {
      state.messages = action.payload;
    },
    addChatMessage: (state, action: PayloadAction<MessageItemModel>) => {
      const existingIndex = state.messages.findIndex(msg => msg.room_id === action.payload.room_id);
      if (existingIndex !== -1) {
        state.messages[existingIndex] = action.payload;
      } else {
        state.messages.unshift(action.payload);
      }
    },
    updateLastMessage: (state, action: PayloadAction<{ room_id: string; message: string; updatedAt: string }>) => {
      const existingMessage = state.messages.find(msg => msg.room_id === action.payload.room_id);
      if (existingMessage) {
        existingMessage.last_message = action.payload.message;
        existingMessage.updatedAt = action.payload.updatedAt;
        state.messages = [
          existingMessage,
          ...state.messages.filter(msg => msg.room_id !== action.payload.room_id)
        ];
      }
    },
  },
});

export const { setChatList, addChatMessage, updateLastMessage } = chatListSlice.actions;
export default chatListSlice.reducer;

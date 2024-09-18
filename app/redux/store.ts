import { configureStore } from '@reduxjs/toolkit'
import messageBoxReducer from './slices/messageBoxSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import chatListReducer from './slices/chatlistSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    messageBoxReducer,
    chatListReducer,
    userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
import {configureStore} from '@reduxjs/toolkit'
import messageBoxReducer from './slices/message-boxSlice'
import fileBoxReducer from './slices/file-boxSlice'
import {TypedUseSelectorHook, useSelector} from 'react-redux'

export const store = configureStore({
    reducer: {
        messageBoxReducer,
        fileBoxReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
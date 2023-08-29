import { configureStore } from '@reduxjs/toolkit'
import gridSliceReducers from './slices/gridSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    grid: gridSliceReducers
  },
})


export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export type gridState = ReturnType<typeof store.getState>;

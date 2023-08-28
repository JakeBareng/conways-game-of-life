import { configureStore } from '@reduxjs/toolkit'
import gridSliceReducers from './slices/gridSlice'

export const store = configureStore({
  reducer: {
    grid: gridSliceReducers
  },
})

export type RootState = {
  grid: Record<string, boolean>;
}

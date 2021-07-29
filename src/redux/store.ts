import { configureStore } from '@reduxjs/toolkit'
import restrictionScheduleReducer from './restrictionScheduleSlice'

export const store = configureStore({
    reducer: {
        restrictionSchedule: restrictionScheduleReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
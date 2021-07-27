import { configureStore } from '@reduxjs/toolkit'
import restrictionScheduleReducer from '../restrictionSchedule/restrictionScheduleSlice'

export const store = configureStore({
    reducer: {
        restrictionsSchedule: restrictionScheduleReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
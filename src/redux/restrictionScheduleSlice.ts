import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {isRestrictedToRoll} from '../services/restrictionScheduleApi'
import {RootState} from './store'
import {InputState} from '../types'

export interface ICanRoll {
    isRestricted?: boolean
}

export interface IInput {
    plate: string,
    date: string,
    hour: string,
    minutes: string,
}

export interface RestrictionScheduleState {
    result: ICanRoll,
    input: IInput
}

const initialState: RestrictionScheduleState = {
    result: {
        isRestricted: null
    },
    input: {
        plate: null,
        date: null,
        hour: null,
        minutes: null
    }
}

export const carIsRestrictedToRoll = createAsyncThunk(
    'restrictionSchedule/canRoll',
    async (input: IInput) => isRestrictedToRoll(input)
)

export const restrictionScheduleSlice = createSlice({
    name: 'restrictionSchedule',
    initialState,
    reducers: {
        setInput(state, action: PayloadAction<InputState>) {
            state.result.isRestricted = null
            state.input[action.payload.key] = action.payload.value
        },
    },
    extraReducers: (builder) => {
        builder.addCase(carIsRestrictedToRoll.fulfilled, (state, action) => {
            state.result.isRestricted = action.payload.data
        })
    }
})

export const { setInput } = restrictionScheduleSlice.actions
export const selectResult = (state: RootState) => state.restrictionSchedule.result
export const selectInput = (state: RootState) => state.restrictionSchedule.input

export default restrictionScheduleSlice.reducer




import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {canRoll} from "./restrictionScheduleApi"

export interface ICanRoll {
    canRoll: boolean
}

export interface RestrictionScheduleState {
    result: ICanRoll
}

const initialState: RestrictionScheduleState = {
    result: {
        canRoll: false
    }
}

export const carCanRoll = createAsyncThunk(
    'restrictionSchedule/canRoll',
    async (plate: string) => canRoll(plate)
)

export const restrictionScheduleSlice = createSlice({
    name: 'restrictionSchedule',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(carCanRoll.fulfilled, (state, action) => {
            state.result.canRoll = action.payload.data
        })
    }
})

export default restrictionScheduleSlice.reducer




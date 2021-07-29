import {carIsRestrictedToRoll, IInput} from '../redux/restrictionScheduleSlice'
import {isRestrictedToRoll} from '../services/restrictionScheduleApi'
import {cleanup} from '@testing-library/react'
import {mocked} from 'ts-jest/utils'
import {AsyncThunkAction, Dispatch} from '@reduxjs/toolkit'
import restrictionScheduleReducer, {setInput} from '../redux/restrictionScheduleSlice'

jest.mock('../services/restrictionScheduleApi')


const mockedApi = mocked(isRestrictedToRoll)

describe('restrictionsScheduleSlice', () => {
    describe('carCanRoll action', () => {
        let dispatch: Dispatch
        let getState: () => unknown

        afterEach(() => {
            cleanup();
            jest.resetAllMocks();
        });

        beforeEach(() => {
            dispatch = jest.fn()
            getState = jest.fn()
        })

        it('should call canRoll with inputs and returns true', async () => {
            // Arrange
            let action: AsyncThunkAction<{data: boolean}, IInput, {}>
            mockedApi.mockImplementationOnce(() => Promise.resolve({data: true}))

            // Act
            action = carIsRestrictedToRoll({plate: 'ABC-1234', date: '22-07-2019', hour: '06', minutes: '00'})
            const result = await action(dispatch, getState, undefined)

            // Assert
            expect(isRestrictedToRoll).toBeCalledWith({plate: 'ABC-1234', date: '22-07-2019', hour: '06', minutes: '00'})
            expect(result).toMatchObject({payload: {data: true}})
        })
    })

    describe('setInput action', () => {
        it('should change state for car plate', () => {
            const previousState = {
                input: {
                    plate: null,
                    date: null,
                    hour: null,
                    minutes: null
                },
                result: {}
            }
            const testResult = restrictionScheduleReducer(
                previousState, setInput({key: 'plate', value: 'ABC-1234'}))
            expect(testResult).toEqual({
                input: {
                    date: null,
                    hour: null,
                    minutes: null,
                    plate: 'ABC-1234',
                },
                result: {
                    isRestricted: null
                }
            })
        })
    })
})
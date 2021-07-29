import React from 'react'
import RestrictionSchedule from '../components/RestrictionSchedule'
import {fireEvent, waitFor} from '@testing-library/dom'
import {store} from '../redux/store'
import {render, screen} from './utils/test-utils'
import {cleanup} from '@testing-library/react'
import DateUtils from '../utils/DateUtils'

describe('RestrictionSchedule', () => {
    afterEach(() => {
        cleanup();
        jest.resetAllMocks();
    })

    beforeEach(() => {
        jest.spyOn(DateUtils, 'getDefaultDate').mockImplementation(() => '2019-07-15')
        jest.spyOn(DateUtils, 'getDefaultTime').mockImplementation(() => '9:15')
    })

    describe('predict when current date and time is used', () => {
        it('should return true for isRestricted when plate last digit is restricted', async () => {
            render(<RestrictionSchedule />)
            let plateInput = screen.getByPlaceholderText('ABC-1234')
            expect(plateInput).toBeInTheDocument()
            fireEvent.change(plateInput, {target: {value: 'XYZ-4321'}})
            expect(plateInput).toHaveValue('XYZ-4321')

            let input = store.getState().restrictionSchedule.input.plate
            expect(input).toEqual('XYZ-4321')

            let submitButton = screen.getByText('Consultar')
            fireEvent.click(
                submitButton,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                })
            )

            await waitFor(() => {
                let isRestricted = store.getState().restrictionSchedule.result.isRestricted
                expect(isRestricted).toBe(true)
            })
        })

        it('should return false for isRestricted when plate last digit is not restricted', async () => {
            render(<RestrictionSchedule/>)
            let plateInput = screen.getByPlaceholderText('ABC-1234')
            fireEvent.change(plateInput, {target: {value: 'XYZ-4320'}})
            fireEvent.click(
                screen.getByText('Consultar'),
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                })
            )
            await waitFor(() => {
                let restricted = store.getState().restrictionSchedule.result.isRestricted
                expect(restricted).toBe(false)
            })
        })
    })

    describe('predict when date and time is selected', () => {
        it('should return true/false for isRestricted depending on plate last digit and show message', async () => {
            render(<RestrictionSchedule/>)
            const plateInput = screen.getByPlaceholderText('ABC-1234')
            const dateInput = screen.getByTestId('date-test')
            const hoursInput = screen.getByTestId('hours-test')
            const minutesInput = screen.getByTestId('minutes-test')
            fireEvent.change(plateInput, {target: {value: 'XYZ-4328'}})
            fireEvent.change(dateInput, {target: {value: '2019-06-06'}})
            fireEvent.change(hoursInput, {target: {value: '16'}})
            fireEvent.change(minutesInput, {target: {value: '15'}})

            fireEvent.click(
                screen.getByText('Consultar'),
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true
                })
            )
            await waitFor(() => {
                const restricted = store.getState().restrictionSchedule.result.isRestricted
                expect(restricted).toBe(true)
                const testMessage = screen.getByText('No puede circular')
                expect(testMessage).toBeInTheDocument()
            })

            fireEvent.change(plateInput, {target: {value: 'XYZ-4320'}})
            fireEvent.click(
                screen.getByText('Consultar'),
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true
                })
            )
            await waitFor(() => {
                const restricted = store.getState().restrictionSchedule.result.isRestricted
                expect(restricted).toBe(false)
                const testMessage = screen.getByText('Puede circular')
                expect(testMessage).toBeInTheDocument()
            })
        })
    })
})
import React from 'react'
import { setInput } from '../../redux/restrictionScheduleSlice';
import {useAppDispatch} from "../../hooks/hooks";

export interface ITime {
    hourValue: string
    minutesValue: string
}

const TimePicker = (props: ITime) => {
    const {hourValue, minutesValue} = props

    const dispatch = useAppDispatch()

    const NUM_HOURS = 24
    const getHourOptions = () => {
        let rows = []
        for(let i = 0; i < NUM_HOURS; i++) {
            rows.push(
                <option key={i} value={i}>{i < 10 ? '0' + i : i}</option>
            )
        }
        return rows
    }
    return (
        <div>
            <label className={"block text-sm font-medium text-gray-700"}>
                Hora
            </label>
            <div className={"p-2 rounded-md shadow-xl"}>
                <div className={"flex w-full sm:text-sm"}>
                    <select
                        onChange={(e) => dispatch(setInput({key: 'hour', value: e.target.value}))}
                        data-testid={"hours-test"}
                        name={"hours"}
                        className={"bg-transparent text-base appearance-none outline-none"}
                        value={hourValue}
                    >
                        {getHourOptions()}
                    </select>
                    <span className={'text-base mr-3 ml-3'}>:</span>
                    <select
                        onChange={(e) => dispatch(setInput({key: 'minutes', value: e.target.value}))}
                        data-testid={"minutes-test"}
                        name="minutes"
                        className="bg-transparent text-base appearance-none outline-none"
                        value={minutesValue}
                    >
                        <option id={'00'} value="0">00</option>
                        <option id={'15'} value="15">15</option>
                        <option id={'30'} value="30">30</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default TimePicker
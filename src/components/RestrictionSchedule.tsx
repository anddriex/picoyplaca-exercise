import React from 'react'
import {useAppDispatch, useAppSelector} from '../hooks/hooks'
import {carIsRestrictedToRoll, selectInput, selectResult, setInput} from '../redux/restrictionScheduleSlice'
import InputComponent from './ui/InputComponent'
import DateUtils from '../utils/DateUtils'
import TimePicker from './ui/TimePicker'

const RestrictionSchedule = () => {
    const resultCanRoll = useAppSelector(selectResult)
    const inputParams = useAppSelector(selectInput)
    const dispatch = useAppDispatch()


    const changeInput = (key, value) => {
        dispatch(setInput({key, value}))
    }
    return (
        <div>
            <div className='py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
                <div className={'text-center space-y-3 sm:text-left'}>
                    <div className={'space-y-0.5'}>
                        <p className={'text-lg text-black font-semibold mr-4'}>
                            Ingresar los siguientes datos para continuar
                        </p>
                        <div className={'space-y-3'}>
                            <InputComponent
                                label={'Placa'}
                                id={'plate'}
                                placeholder={'ABC-1234'}
                                changeInput={(key, value) => changeInput(key, value)}
                                type={'text'}
                            />
                            <div className={'flex justify-between space-x-3'}>
                                <InputComponent
                                    changeInput={(key, value) => changeInput(key, value)}
                                    id={'date'}
                                    label={'Fecha'}
                                    type={'date'}
                                    value={inputParams.date ?? DateUtils.getDefaultDate()}
                                    testId={'date-test'}
                                />
                                <TimePicker
                                    hourValue={inputParams.hour ?? DateUtils.getDefaultTime().split(':')[0]}
                                    minutesValue={inputParams.minutes ?? DateUtils.getDefaultTime().split(':')[1]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={'flex'}>
                        <button
                            onClick={() => {
                                dispatch(carIsRestrictedToRoll(inputParams))
                            }}
                            className={'mr-3 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'}>
                            Consultar
                        </button>
                        <div className={'flex w-full justify-center'}>
                            <div className={'flex flex-col justify-center'}>
                                {resultCanRoll.isRestricted !== null ? (resultCanRoll.isRestricted ? <p className={'text-red-600'}>No puede circular</p> : <p className={'text-green-600'}>Puede circular</p>) : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RestrictionSchedule
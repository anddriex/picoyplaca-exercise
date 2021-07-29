import {IInput} from '../redux/restrictionScheduleSlice'
import DateUtils from '../utils/DateUtils'

const rules = [
    {
        day: 'Lunes',
        plates: [1, 2]
    },
    {
        day: 'Martes',
        plates: [3, 4]
    },
    {
        day: 'Miércoles',
        plates: [5, 6]
    },
    {
        day: 'Jueves',
        plates: [7, 8]
    },
    {
        day: 'Viernes',
        plates: [9, 0]
    },
]


export const isRestrictedToRoll = (input: IInput) => {
    return new Promise<{data: boolean}>(resolve => {
        const lastDigit = parseInt(input.plate?.substr(-1), 10)
        if(input.plate === null || isNaN(lastDigit)) return Promise.reject(alert('Placa inválida'))

        const hour = input.hour ? input.hour : DateUtils.getDefaultTime().split(':')[0]
        const minutes = input.minutes ? input.minutes : DateUtils.getDefaultTime().split(':')[1]
        const date = input.date ? input.date : DateUtils.getDefaultDate()
        const day = DateUtils.getDayOfDate(date)
        if (day >= 1 || day <= 5) {
            const isDayRestricted = rules[day - 1].plates.includes(lastDigit)
            const isTimeRestricted = DateUtils.timeIsBetweenRestrictionRange(hour + ':' + minutes)
            return setTimeout(() => resolve({data: isDayRestricted && isTimeRestricted}), 500)
        }
        return setTimeout(() => resolve({data: false}), 500)
    })
}
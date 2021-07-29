const YEAR = 0
const MONTH = 1
const DAY = 2

const HOUR = 0
const MINUTES = 1

const RANGE = [
    {
        start: '7:00',
        end: '9:30'
    },
    {
        start: '16:00',
        end: '19:30'
    }
]

export default class DateUtils {
    static getDefaultTime = () => {
        const df = new Date()
        return df.getHours() + ':' + '00'
    }

    static getDefaultDate = () => {
        const df = new Date()
        const currentMonth = df.getMonth() + 1
        return df.getFullYear() + '-' + (currentMonth < 10 ? '0' + currentMonth : currentMonth) + '-' + df.getDate()
    }

    static getDayOfDate = (date: string) => {
        const dateList = date.split('-')
        const dateResult = new Date(
            parseInt(dateList[YEAR]),
            parseInt(dateList[MONTH]) - 1,
            parseInt(dateList[DAY]))
        return dateResult.getDay()
    }

    static timeIsBetweenRestrictionRange = (time: string) => {
        const hour = time.split(':')[HOUR]
        const minutes = time.split(':')[MINUTES]

        let isRestricted = false

        RANGE.forEach((range) => {
            const startHourRange = range.start.split(':')[HOUR]
            const endHourRange = range.end.split(':')[HOUR]
            const endMinutesRange = range.end.split(':')[MINUTES]
            if(hour >= startHourRange && (hour <= endHourRange && minutes <= endMinutesRange)) isRestricted = true
        })
        return isRestricted
    }
}
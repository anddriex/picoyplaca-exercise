
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

export const canRoll = (plate: string) => {
    return new Promise<{data: boolean}>(resolve => {
        console.log(plate)
        return setTimeout(() => resolve({data: true}), 500)
    })
}
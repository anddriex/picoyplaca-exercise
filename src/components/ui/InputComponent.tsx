import * as React from 'react'

export interface IInputComponent {
    changeInput: (key, value) => void
    id: string
    label: string
    type: string
    testId?: string
    value?: string
    placeholder?: string
}

const InputComponent = (props: IInputComponent) => {
    const {changeInput, placeholder, id, label, type, value, testId} = props

    return (
        <div>
            <label htmlFor={'plate'} className={'block text-sm font-medium text-gray-700'}>
                {label}
            </label>
            <div className={'mt-1 relative rounded-md shadow-sm'}>
                <input
                    onChange={(e) => changeInput(id, e.target.value)}
                    type={type}
                    name={id}
                    id={id}
                    className={'focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm border-gray-300 rounded-md'}
                    placeholder={placeholder}
                    value={value}
                    data-testid={testId}
                />
            </div>
        </div>
    )
}

export default InputComponent
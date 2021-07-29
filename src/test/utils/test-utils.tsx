import React, { FC } from 'react'
import {render as rtlRender , RenderOptions} from '@testing-library/react'
import {Provider} from 'react-redux'
import {store} from '../../redux/store'


const render = (
    ui: JSX.Element,
    options?: Omit<RenderOptions, 'wrapper'>,
) => {
    const Wrapper: FC = ({children}) => {
        return (
            <Provider store={store}>
                {children}
            </Provider>
        )
    }
    return rtlRender(ui, {wrapper: Wrapper, ...options})
}

export * from '@testing-library/react'
export { render }
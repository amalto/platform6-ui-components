import * as React from 'react'
import * as ReactDOM from 'react-dom'

// hmr
import { AppContainer } from 'react-hot-loader'

// intl
import { addLocaleData, IntlProvider } from 'react-intl'

import * as en from 'react-intl/locale-data/en'

import Container from './Container'

addLocaleData( [...en] )

declare var module: { hot: any }
declare var require: any

if ( module.hot ) {
    require( 'react-hot-loader/patch' )
}

const renderApp = ( Component: React.ComponentType<any> ) => {
    let container = (
        <IntlProvider locale={'en-US'}>
            <Container />
        </IntlProvider>
    )

    if ( module.hot ) {
        container = <AppContainer>{container}</AppContainer>
    }
    return container
}

const target: HTMLElement = document.getElementById( 'reactApp' )

ReactDOM.render( renderApp( Container ), target )

if ( module.hot ) {
    module.hot.accept( './Container', () => {
        ReactDOM.render( renderApp( Container ), target )
    } )
}
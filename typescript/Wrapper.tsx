// Modules
import * as React from 'react'
import { Provider } from 'react-redux'

// Utils
import { loadTooltips, unloadTooltips } from '@amalto/helpers'

// Store
import { store } from '../Store'

module Wrapper {
    export interface Props extends React.ClassAttributes<Wrapper> { }

    export interface State { }
}

class Wrapper extends React.Component<Wrapper.Props, Wrapper.State> {

    private _body: HTMLDivElement = null

    constructor( props: Wrapper.Props ) {
        super( props )
        this.state = {}
    }

    componentDidMount() {
        loadTooltips( this._body )
    }

    componentWillUnmount() {
        unloadTooltips( this._body )
    }

    render() {
        return <Provider store={store}>
            <div ref={dom => this._body = dom}>
                {this.props.children}
            </div>
        </Provider>
    }
}

export default Wrapper
// Modules
import * as React from 'react'

// Assets
import { spinner } from './images/spinner'

/**
 * Loading spinner.
 */
module Spinner {
    export interface Props extends React.Props<Spinner> {
        /** Top position. */
        top?: string | number;
        /** Bottom position. */
        bottom?: string | number;
        /** Right position. */
        right?: string | number;
        /** Left position. */
        left?: string | number;
        /**
         * Spinner size.
         * @default 32
         */
        size?: number;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<Spinner>;
    }
}

class Spinner extends React.Component<Spinner.Props, any> {
    constructor( props: Spinner.Props ) {
        super( props )
    }

    render() {
        const { top, bottom, right, left, size } = this.props
        let spinnerStyle: React.CSSProperties = {
            position: 'relative',
            display: 'block',
            margin: 'auto',
            textAlign: 'center',
            top,
            bottom,
            right,
            left
        }

        return (

            <div className='spinner' style={spinnerStyle}>
                <img src={spinner} alt='Loading...' width={this.props.size || 32} height={this.props.size || 32} />
            </div>

        )
    }

}

export default Spinner
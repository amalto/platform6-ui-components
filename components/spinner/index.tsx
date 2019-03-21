// Modules
import * as React from 'react'

// Assets
import { spinner } from './images/spinner'

/**
 * Loading spinner.
 */
module Spinner {
    export interface Props {
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
    }
}

function Spinner( props: Spinner.Props ) {

    const { top, bottom, right, left, size } = props

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
            <img src={spinner} alt='Loading...' width={size || 32} height={size || 32} />
        </div>

    )
}

export default Spinner
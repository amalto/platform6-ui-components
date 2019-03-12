// Modules
import * as React from 'react'
import * as classNames from 'classnames'

import { COLORS } from './constants/colors'

/**
 * Choose a color from a panel.
 */
module ColorPicker {
    export interface Props {
        /** Current hexadecimal string color. */
        color: string
        /** Callback function executed when the user selects a color. */
        handleColorChange: ( color: string ) => void
    }
}

// Handle color pick click
function handleColorClick( event: any ): void {
    this.props.handleColorChange( event.currentTarget.getAttribute( 'data-color-hex' ) )
}

/**
 * Allow you to choose a color within a list.
 */
function ColorPicker( props: ColorPicker.Props ) {
    const [palette, setPalette] = React.useState( [] )


    React.useEffect( () => {
        setPalette(
            COLORS.map( ( colorCode: string, idx: number ) => {
                let styles = {
                    backgroundColor: colorCode
                }

                return (
                    <div key={idx} style={styles} className={classNames( 'color-selector', {
                        'selected': props.color === colorCode
                    } )} onClick={handleColorClick} data-color-hex={colorCode}></div>
                )
            } )
        )
    } )

    return (
        <div className="custom-color-picker">
            <div className="custom-color-palette">
                {palette}
            </div>
        </div>
    )
}

export default ColorPicker

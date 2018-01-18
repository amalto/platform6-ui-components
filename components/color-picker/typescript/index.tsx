import * as React from 'react'

//modules
import * as classNames from 'classnames'

module ColorPicker {
    export interface Props extends React.Props<ColorPicker> {
        /** Current hexadecimal string color. */
        color: string
        /** Callback function executed when the user selects a color. */
        handleColorChange: ( color: string ) => void

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<ColorPicker>;
    }
}


class ColorPicker extends React.Component<ColorPicker.Props, any> {
    constructor( props: ColorPicker.Props ) {
        super( props )
    }

    render() {

        let palette = this.colors().map( ( colorCode: string, idx: number ) => {
            let styles = {
                backgroundColor: colorCode
            }

            return (
                <div key={idx} style={styles} className={classNames( 'color-selector', {
                    'selected': this.props.color === colorCode
                } )} onClick={this.handleColorClick} data-color-hex={colorCode}></div>
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

    private handleColorClick = ( event: any ): void => {
        this.props.handleColorChange( event.currentTarget.getAttribute( 'data-color-hex' ) )
    }

    private colors = (): string[] => {
        return [
            "#ffffff", "#000000", "#b4dcfa", "#5eccf3", "#a7ea52", "#5dceaf", "#ff8021", "#f14124",
            "#f0f3f3", "#7e7e7e", "#8bc9f7", "#def4fc", "#edfadc", "#def5ef", "#ffe5d2", "#fcd9d3",
            "#d8d8d8", "#565656", "#4facf3", "#beeafa", "#dbf6b9", "#beebdf", "#ffcca6", "#f9b3a7",
            "#bfbfbf", "#3a3a3a", "#0d78c9", "#9ee0f7", "#caf297", "#9de1cf", "#ffb279", "#f68d7b",
            "#a5a5a5", "#262626", "#063c64", "#11b2eb", "#81d319", "#34ac8b", "#d85c00", "#c3260c",
            "#7f7f7f", "#0c0c0c", "#021828", "#0b769c", "#568c11", "#22725c", "#903d00", "#821908"
        ]
    }

}

export default ColorPicker

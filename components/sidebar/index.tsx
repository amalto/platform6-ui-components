import * as React from 'react'
import { default as classNames } from 'classnames'

/**
 * Customisable Sidebar.
 */
module Sidebar {

    export interface Props extends React.Props<Sidebar> {

        /** Sidebar css */
        mainCss?: string;

        /** Sidebar style */
        mainStyle?: React.CSSProperties;

        /** Background color */
        backgroundColor: string;

        /** Dimension */
        width?: number | string;
        height?: number | string;

        /** Sibebar content */
        children?: React.ReactNode;

        /** Hide props from documentation */

        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<Sidebar>;
    }
}

class Sidebar extends React.Component<Sidebar.Props, any> {
    constructor( props: Sidebar.Props ) {
        super( props )
    }

    render() {
        const { mainCss, mainStyle, backgroundColor, width, height, children } = this.props

        return (
            <div className={mainCss} style={{ width, height, backgroundColor, overflow: 'auto', ...mainStyle }}>
                {children}
            </div>
        )
    }
}


export default Sidebar

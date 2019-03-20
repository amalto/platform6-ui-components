import * as React from 'react'

/**
 * Customisable Sidebar.
 */
module Sidebar {

    export interface Props {

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
    }
}

function Sidebar( props: Sidebar.Props ) {
    const { mainCss, mainStyle, backgroundColor, width, height, children } = props

    return (
        <div className={mainCss} style={{ width, height, backgroundColor, overflow: 'auto', ...mainStyle }}>
            {children}
        </div>
    )
}

export default Sidebar

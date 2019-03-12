import * as React from 'react'

/**
 * Customisable Container.
 */
module Container {

    export interface Props {

        /** Container css */
        mainCss?: string;

        /** Container style */
        mainStyle?: React.CSSProperties;

        /** Background color */
        backgroundColor: string;

        /** Dimension */
        height?: number | string;

        children?: React.ReactNode;
    }
}

function Container( props: Container.Props ) {
    const { mainCss, mainStyle, backgroundColor, height, children } = props

    return (
        <section className={mainCss} style={{ backgroundColor, height, ...mainStyle }}>
            {children}
        </section>
    )
}

export default Container

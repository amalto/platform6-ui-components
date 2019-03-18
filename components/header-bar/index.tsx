import * as React from 'react'

import Brand from './components/Brand'
import Burger from './components/Burger'

/**
 * Customisable HeaderBar.
 */
module HeaderBar {

    export interface Props {

        /** HeaderBar css */
        mainCss?: string;

        /** HeaderBar style */
        mainStyle?: React.CSSProperties;

        /** Background color */1
        backgroundColor: string;

        /** Dimension */
        height?: number | string;

        /** Brand logo source */
        imgSrc: string;

        /** Redirect url */
        url: string;

        /** Burger click action */
        burgerAction: () => void;
    }
}

function HeaderBar( props: HeaderBar.Props ) {

    const { mainCss, mainStyle, backgroundColor, height, imgSrc, url, burgerAction } = props

    return (
        <header className={mainCss} style={{
            height: height || 70,
            backgroundColor,
            overflow: 'auto',
            position: 'fixed',
            zIndex: 200,
            ...mainStyle,
        }}>
            <Brand backgroundColor={backgroundColor} imgSrc={imgSrc} url={url} />
            <Burger burgerAction={burgerAction} />
        </header>
    )
}

export default HeaderBar

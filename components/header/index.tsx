import * as React from 'react'
import * as classNames from 'classnames'

import Brand from './components/Brand'
import Burger from './components/Burger'

/**
 * Customisable Header.
 */
module Header {

    export interface Props extends React.Props<Header> {

        /** Header css */
        mainCss?: string;

        /** Header style */
        mainStyle?: React.CSSProperties;

        /** Background color */
        backgroundColor: string;

        /** Dimension */
        height?: number | string;

        /** Brand logo source */
        imgSrc: string;

        /** Redirect url */
        url: string;

        /** Burger click action */
        burgerAction: () => void;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<Header>;
    }
}

class Header extends React.Component<Header.Props, any> {
    constructor( props: Header.Props ) {
        super( props )
    }

    render() {
        const { mainCss, mainStyle, backgroundColor, height, imgSrc, url, burgerAction } = this.props

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
}


export default Header

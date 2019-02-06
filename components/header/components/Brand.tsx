import * as React from 'react'
import * as classNames from 'classnames'

/**
 * Customisable Brand.
 */
module Brand {

    export interface Props extends React.Props<Brand> {

        /** Brand css */
        mainCss?: string;

        /** Brand style */
        mainStyle?: React.CSSProperties;

        /** Background color */
        backgroundColor: string;

        /** Brand logo */
        imgSrc: string;

        url: string;

        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<Brand>;
    }
}

class Brand extends React.Component<Brand.Props, any> {
    constructor( props: Brand.Props ) {
        super( props )
    }

    render() {
        const { mainCss, mainStyle, backgroundColor, imgSrc, url } = this.props

        return (
            <header className={mainCss}
                style={{
                    ...mainStyle,
                    height: '100%',
                    width: 240,
                    backgroundColor,
                    float: 'left',
                    padding: '0px 10px',
                    position: 'relative',
                    display: 'table',
                    textAlign: 'center'

                }}>
                <a href={url} style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                    <img src={imgSrc} />
                </a>
            </header>
        )
    }
}


export default Brand

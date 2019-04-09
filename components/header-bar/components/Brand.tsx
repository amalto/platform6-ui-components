import * as React from 'react'
import * as classNames from 'classnames'

/**
 * Customisable Brand.
 */
module Brand {

    export interface Props extends React.Props<Brand> {

        /** Image container css */
        imageContainerCss?: string;

        /** Brand css */
        imageCss?: string;

        /** Image container style */
        imageContainerStyle?: React.CSSProperties;

        /** Brand style */
        imageStyle?: React.CSSProperties;

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
        const { imageCss, imageStyle, imageContainerCss, imageContainerStyle, backgroundColor, imgSrc, url } = this.props

        return (
            <header className={imageContainerCss}
                style={{
                    height: '100%',
                    maxWidth: 240,
                    backgroundColor,
                    float: 'left',
                    padding: '0px 10px',
                    position: 'relative',
                    display: 'table',
                    textAlign: 'center',
                    ...imageContainerStyle
                }}>
                <a href={url} className={imageCss} style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                    <img src={imgSrc} className={imageCss} style={imageStyle} />
                </a>
            </header>
        )
    }
}


export default Brand

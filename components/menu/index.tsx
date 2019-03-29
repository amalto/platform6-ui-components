// Modules
import * as React from 'react'

/**
 * Small button with an icon instead of text.
 */
module Menu {

    export interface Props {

        /** Title */
        title: string;

        /** Links */
        children: React.ReactElement<any>[];

        hideLabel?: boolean;

        /** current menu entry selected */
        selectedEntry: string;

        /** Select entry */
        selectEntry: ( entry: string ) => void;

        /** Main color */
        mainColor: string;

        /** Secondary color */
        subColor: string;

        /** Text color */
        textColor: string;

        /** Hover text color */
        hoverTextColor: string;
    }

}

function Menu( props: Menu.Props ) {
    const { title, children, hideLabel, mainColor, textColor, subColor, hoverTextColor } = props

    const styles = {
        'menu-link': {
            color: textColor,

            ':hover': {
                color: hoverTextColor,
                backgroundColor: subColor
            }
        }
    }

    return (
        <div style={!hideLabel ? {} : { paddingTop: 10 }}>
            {
                !hideLabel ? (
                    <h5 style={{
                        color: mainColor,
                        fontWeight: 400,
                        fontSize: '1.25em',
                        padding: '10px 10px 5px',
                        textTransform: 'uppercase'
                    }}>
                        <span style={{ fontSize: '.813em' }}>{title}</span>
                    </h5>
                ) : null
            }
            <ul style={{ padding: 0, margin: !hideLabel ? '0px 10px' : '0px 5px', paddingBottom: 10 }}>
                {
                    children.map( ( child, idx ) => (
                        <li className='menu-line' style={{ ...this.props.itemStyle, ...styles['menu-link'] }} key={idx}>{child}</li>
                    ) )
                }
            </ul>
        </div>
    )
}

export default Menu

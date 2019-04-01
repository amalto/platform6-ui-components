// Modules
import * as React from 'react'

/**
 * Small button with an icon instead of text.
 * See [Internal Resources](#menu-1)
 */
module Menu {

    export interface Props extends React.Props<Menu> {

        /** Title */
        title: string;

        /** Entries */
        entries: JSX.Element[];

        itemStyle: React.CSSProperties;

        hideLabel?: boolean;

        /** current menu entry selected */
        selectedEntry: string;

        /** Select entry */
        selectEntry: ( entry: number ) => void;

        /** Main color */
        mainColor: string;

        /** Secondary color */
        subColor: string;

        /** Text color */
        textColor: string;

        /** Hover text color */
        hoverTextColor: string;

        /** Menu width */
        width?: number | string;

        /** Menu height */
        height?: number | string;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<Menu>;
    }

    export interface State {
    }
}

class Menu extends React.Component<Menu.Props, any> {
    constructor( props: Menu.Props ) {
        super( props )

        this.state = {}
    }

    render() {
        const { title, children, hideLabel, mainColor, textColor, subColor, hoverTextColor, width, height } = this.props

        const styles = {
            'menu-link': {
                color: textColor,
                textAlign: hideLabel ? 'center' : undefined,
                marginTop: 2,
                listStyle: 'none',
                padding: 0,
                overflow: 'hidden' as any,
                whiteSpace: 'nowrap',
                borderRadius: 4,

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
                        ( children as React.ReactElement<any>[] ).map( ( child, idx ) => (
                            <li className='menu-line' style={{ ...this.props.itemStyle, ...styles['menu-link'] }} key={idx}>{child}</li>
                        ) )
                    }
                </ul>
            </div>
        )
    }
}


export default Menu

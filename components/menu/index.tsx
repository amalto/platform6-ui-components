// Modules
import * as React from 'react'
import * as classNames from 'classnames'

// Models
import { Entry } from './models/Entry'

// Components
import Link from './components/Link'

/**
 * Small button with an icon instead of text.
 */
module Menu {

    export interface Props extends React.Props<Menu> {

        /** Title */
        title: string;

        /** Entries */
        entries?: Entry[];

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
        const { title, entries, hideLabel, selectedEntry, selectEntry, mainColor, textColor, subColor, hoverTextColor, width, height } = this.props

        const activeStyle = {
            color: subColor,
            backgroundColor: mainColor
        }

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
                        entries.map( ( e, idx ) => {
                            return (
                                <Link key={`link_${ e.label }`}
                                    entry={e}
                                    linkStyle={styles['menu-link']}
                                    hideLabel={hideLabel}
                                    selectEntry={selectEntry}
                                    activeStyle={selectedEntry === e.label ? activeStyle : null} />
                            )
                        } )
                    }
                </ul>
            </div>
        )
    }
}


export default Menu

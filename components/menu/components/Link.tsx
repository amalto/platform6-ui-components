import * as React from 'react'
import Radium, { Styles } from 'radium'
import * as classNames from 'classnames'

import { Entry } from '../models/Entry'

import { styles } from '../styles/link'

module Link {

    export interface Props extends React.Props<Link> {
        entry: Entry;

        linkStyle: any;
        hideLabel: boolean;
        activeStyle: React.CSSProperties;
        selectEntry: ( entry: string ) => void;
    }
}

class Link extends React.Component<Link.Props, any> {

    constructor( props: Link.Props ) {
        super( props )
        this.state = {}
    }

    render() {
        const { entry, linkStyle, hideLabel, activeStyle, selectEntry } = this.props

        const finalStyle = !!activeStyle ? { ...linkStyle, ...activeStyle, ...styles.menuLink, ':hover': undefined } : { ...linkStyle, ...styles.menuLink }

        if ( !hideLabel ) {
            delete finalStyle.textAlign
        }

        return (
            <li
                onClick={() => selectEntry( entry.label )}
                className={classNames( {
                    'text-small': hideLabel
                } )}
                style={[styles.itemList]}>
                <a href={entry.url} style={[finalStyle]}>
                    <span className={entry.icon} style={{ marginRight: !hideLabel ? 5 : 0 }} />
                    {!hideLabel ? <span>{entry.label}</span> : null}
                </a>
            </li>
        )
    }
}

export default Radium( Link )
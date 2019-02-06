import * as React from 'react'
import Radium, { Styles } from 'radium'
import * as classNames from 'classnames'

import { Entry } from '../models/Entry'

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

        const finalStyle = !!activeStyle ? { ...linkStyle, ...activeStyle, ':hover': undefined } : linkStyle

        return (
            <li
                onClick={e => selectEntry( entry.label )}
                className={classNames( {
                    'text-small': hideLabel
                } )}
                style={{
                    marginTop: 2,
                    listStyle: 'none',
                    padding: 0,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                }}>
                <a href={entry.url} style={[this.getLinkStyle(), finalStyle]}>
                    <span className={entry.icon} style={{ marginRight: 5 }} />
                    {!hideLabel ? <span>{entry.label}</span> : null}
                </a>
            </li>
        )
    }

    private getLinkStyle = (): React.CSSProperties => {
        return {
            display: 'block',
            padding: '9px 10px',
            borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomRightRadius: 4, borderBottomLeftRadius: 4
        }
    }
}

export default Radium( Link )
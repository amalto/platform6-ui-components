import * as React from 'react'
import Link from 'react-styleguidist/lib/rsg-components/Link'

module VersionLine {
    export interface Props extends React.ClassAttributes<VersionLine> {
        version: string;
    }

    export interface State {

    }
}

class VersionLine extends React.Component<VersionLine.Props, VersionLine.State> {
    constructor( props: VersionLine.Props ) {
        super( props )
        this.state = {}
    }

    render() {
        const { version } = this.props

        return <div>Version: {version}</div>
    }
 }

export default VersionLine
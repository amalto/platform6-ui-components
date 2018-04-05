import * as React from 'react'
import Pathline from 'react-styleguidist/lib/rsg-components/Pathline'

module InstallLine {
    export interface Props extends React.ClassAttributes<InstallLine> {
        componentName: string;
    }

    export interface State {

    }
}

class InstallLine extends React.Component<InstallLine.Props, InstallLine.State> {
    constructor( props: InstallLine.Props ) {
        super( props )
        this.state = {}
    }

    render() {
        const { componentName } = this.props

        return <Pathline classes={{}} children={`npm install --save @amalto/${componentName}`} />
    }
 }

export default InstallLine
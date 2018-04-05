import * as React from 'react'
import Pathline from 'react-styleguidist/lib/rsg-components/Pathline'

module CopyStringContent {
    export interface Props extends React.ClassAttributes<CopyStringContent> {
        content: string;
    }

    export interface State {

    }
}

class CopyStringContent extends React.Component<CopyStringContent.Props, CopyStringContent.State> {
    constructor( props: CopyStringContent.Props ) {
        super( props )
        this.state = {}
    }

    render() {
        const { content } = this.props

        return <Pathline classes={{}} children={content} />
    }
 }

export default CopyStringContent
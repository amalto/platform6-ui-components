import * as React from 'react'
import Link from 'react-styleguidist/lib/rsg-components/Link'

module NpmLink {
    export interface Props extends React.ClassAttributes<NpmLink> {
        href: string;
        name: string;
    }

    export interface State {

    }
}

class NpmLink extends React.Component<NpmLink.Props, NpmLink.State> {
    constructor( props: NpmLink.Props ) {
        super( props )
        this.state = {}
    }

    render() {
        const { href, name } = this.props

        return <div>npm <Link classes={{}} href={href} target='_blank'>{name}</Link></div>
    }
 }

export default NpmLink
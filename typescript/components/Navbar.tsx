import * as React from 'react'

module Navbar {

    export interface Props extends React.Props<Navbar> {
        width: number | string;
        height: number | string;
        title: string;
        menu: string[];
    }

    export interface State {
        selected?: string;
    }
}

class Navbar extends React.Component<Navbar.Props, Navbar.State> {
    constructor( props: Navbar.Props ) {
        super( props )
        this.state = {}
    }

    render() {
        return <div className='sidebar'>
            <h1>{this.props.title}</h1>
            <div className='menu'>
                {
                    this.props.menu.map( link => (
                        <span className='link'>{link}</span>
                    ) )
                }
            </div>
        </div>
    }
}

export default Navbar
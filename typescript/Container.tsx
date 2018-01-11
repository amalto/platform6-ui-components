/**
 * Modules
 */
import * as React from 'react'
import * as classNames from 'classnames'


/**
 * Components
 */
import Sidebar from 'react-sidebar'
import Navbar from './components/Navbar'

/**
 * Models
 */
import { Menu } from './components/models/Menu'

/**
 * Constant
 */
import { menu } from './constants/menu'

module Container {

    export interface Props extends React.Props<Container> {

    }

    export interface State {
        sidebarOpen?: boolean;
        selectedMenu?: string;
    }
}

class Container extends React.Component<Container.Props, any> {
    constructor( props: Container.Props ) {
        super( props )
        this.state = {
            sidebarOpen: true,
            selectedMenu: ''
        }
    }

    render() {
        const { sidebarOpen } = this.state
        const sidebar: JSX.Element = <div>
            <h1>b2-common-components</h1>
            <i className='fa fa-bars default-color toggle-sidebar-in'
                onClick={this.toggleOpenSidebar}
            />
            {this.displayMenu( menu )}
        </div>

        return <div className='full-width full-height'
            style={{ backgroundColor: 'white' }}>
            <Sidebar sidebar={sidebar}
                open={sidebarOpen}
                docked={sidebarOpen}
                rootClassName='documentation'
                sidebarClassName='sidebar'
                contentClassName='container'
            >
                {
                    !sidebarOpen ? <i className='fa fa-bars default-color toggle-sidebar-out'
                        onClick={this.toggleOpenSidebar}
                    /> : null
                }
                <div>The content of the page will be displayed here</div>
            </Sidebar>
        </div>
    }

    private toggleOpenSidebar = (): void => {
        this.setState( {
            sidebarOpen: !this.state.sidebarOpen
        } as Container.State )
    }

    private displayMenu = ( menu: Menu[] ): JSX.Element => {

        return <ul>
            {
                menu.map( m => (
                    <div key={m.title}>
                        <h2>{m.title}</h2>
                        {
                            Object.keys( m.links ).map( key => (
                                <li key={key}
                                    className={classNames( 'link', {
                                        'selected': this.state.selectedMenu === key
                                    } )}
                                    onClick={e => this.selectMenu( key )}>
                                    {m.links[key]}
                                </li>
                            ) )
                        }
                    </div>
                ) )
            }
        </ul>
    }

    private selectMenu = ( key: string ): void => {
        this.setState( { selectedMenu: key } as Container.State )
    }
}

export default Container
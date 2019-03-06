// Modules
import * as React from 'react'

// Components
import Pathline from 'react-styleguidist/lib/rsg-components/Pathline/PathlineRenderer'
import Link from 'react-styleguidist/lib/rsg-components/Link'

module CustomPathline {
    export interface Props extends React.ClassAttributes<CustomPathline> {
        children: string;
    }

    export interface State {

    }
}

class CustomPathline extends React.Component<CustomPathline.Props, CustomPathline.State> {
    constructor( props: CustomPathline.Props ) {
        super( props )
        this.state = {}
    }

    render() {
        const { children } = this.props
        const { name, version } = this.extractData( children )

        return children ? <div>
            <table>
                <tbody>
                    <tr>
                        <td><span className='text-small'>Install</span></td>
                        <td><span className='text-small'><Pathline classes={{}} children={`npm install --save ${ name }`} /></span></td>
                    </tr>
                    <tr>
                        <td><span className='text-small'>npm</span></td>
                        <td><span className='text-small'><Link classes={{}} href={`https://www.npmjs.com/package/${ name }`} target='_blank'>{name}</Link></span></td>
                    </tr>
                    <tr>
                        <td><span className='text-small'>Version</span></td>
                        <td><span className='text-small quote'>{version}</span></td>
                    </tr>
                </tbody>
            </table>
        </div> : null
    }

    private extractData = ( json: string ): { name: string, version: string } => {
        if ( json ) {
            try {
                const parsedData = JSON.parse( json )

                return parsedData
            } catch ( err ) {
                return null
            }
        }

        return null
    }
}

export default CustomPathline
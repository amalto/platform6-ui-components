import * as React from 'react'

module Description {
    export interface Props extends React.ClassAttributes<Description> {
        link: string;
        version: string;
    }

    export interface State {

    }
}

class Description extends React.Component<Description.Props, Description.State> {
    constructor( props: Description.Props ) {
        super( props )
        this.state = {}
    }

    render() {
        const { link, version } = this.props

        return <div className='description'>
            {this.generateLine( 'npm', link )}
            {this.generateLine( 'version', version )}
        </div>
    }

    private generateLine = ( label: string, value: string | JSX.Element ): JSX.Element => {
        return <div className='description-line'>
            <label>{label}</label>
            <div>{value}</div>
        </div>
    }
 }

export default Description
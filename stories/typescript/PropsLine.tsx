import * as React from 'react'

// import '../../public/sass/main'

module PropsLine {

    export interface Props extends React.Props<PropsLine> {
        name: string;
        type: string;
        defaultValue?: string;
        required?: boolean;
        description: string | JSX.Element;
        deprecated?: boolean;
    }
}

class PropsLine extends React.Component<PropsLine.Props, any> {
    constructor( props: PropsLine.Props ) {
        super( props )
        this.state = {}
    }

    render() {
        const { name, type, required, description, defaultValue, deprecated } = this.props

        return <div>
            <div className='props-header'>
                <div className='name'>{name}</div>
                <div className='type'>{type}</div>
                {defaultValue ? <div className='default'>{` = ${ defaultValue }`}</div> : null}
                {required ? <div className='required'>required</div> : null}
                {deprecated ? <div className='deprecated'>(deprecated)</div> : null}
            </div>
            <div className='separator' />
            <div className='props-body'>
                <div>{description}</div>
            </div>
        </div>
    }
}

export default PropsLine
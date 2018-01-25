import * as React from 'react'

namespace Help {
    export interface Props extends React.Props<Help> {
        text: string
    }
}


class Help extends React.Component<Help.Props, any> {

    private _helpPopup = HTMLSpanElement = null

    render() {
        return (
            <span className="fa fa-fw fa-question-circle default-color" data-content={this.props.text} ref={dom => this._helpPopup = dom}></span>
        )
    }

    componentDidMount() {
        $( this._helpPopup ).popover(
            {
                container: 'body',
                trigger: 'hover',
                html: true
            }
        )
    }

    componentWillUnmount() {
        $( this._helpPopup ).popover( 'destroy' )
    }
}

export default Help
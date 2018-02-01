import * as React from 'react'

namespace Help {
    export interface Props extends React.Props<Help> {
        text: string
    }
}


class Help extends React.Component<Help.Props, any> {

    render() {
        return (
            <span className="fa fa-fw fa-question-circle default-color" data-content={this.props.text} ref="helpPopup"></span>
        )
    }

    componentDidMount() {
        $( this.refs['helpPopup'] ).popover(
            {
                container: 'body',
                trigger: 'hover',
                html: true
            }
        )
    }

    componentWillUnmount() {
        $( this.refs['helpPopup'] ).popover( 'destroy' )
    }
}

export default Help
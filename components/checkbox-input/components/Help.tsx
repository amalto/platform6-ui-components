import * as React from 'react'

import * as classNames from 'classnames'

namespace Help {
    export interface Props extends React.Props<Help> {
        containerClass?: string;
        style?: React.CSSProperties;
        text: string
    }
}


class Help extends React.Component<Help.Props, any> {

    render() {
        return (
            <span className={
                classNames(
                    'fa fa-fw fa-question-circle default-color',
                    this.props.containerClass
                )
            }
                data-content={this.props.text}
                ref="helpPopup"
                style={this.props.style}
            >
            </span>
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
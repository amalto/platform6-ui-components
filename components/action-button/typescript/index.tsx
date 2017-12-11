import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as classNames from 'classnames'

import { unloadTooltips, loadTooltips } from 'helpers'


module ActionButton {
    export interface Props extends React.Props<ActionButton> {
        clickAction?: React.EventHandler<React.MouseEvent<Element>>
        iconClass?: string
        colorClass?: string
        disabled?: boolean
        tooltipText?: string
        btnClass?: string
    }
}

class ActionButton extends React.Component<ActionButton.Props, any> {
    constructor( props: ActionButton.Props ) {
        super( props )
    }

    render() {
        var handleClick = null
        if ( this.props.disabled ) {
            handleClick = ''
        }
        else {
            handleClick = this.props.clickAction
        }

        return (
            <span className={classNames( 'action-icon-button', this.props.btnClass, { 'disabled': this.props.disabled } )}
                onClick={handleClick} data-toggle="tooltip" data-original-title={this.props.disabled ? null : this.props.tooltipText}>
                <span className={classNames( 'fa', this.props.iconClass, this.props.colorClass )}></span>
            </span>
        )
    }

    componentDidMount() {
        loadTooltips( ReactDOM.findDOMNode( this ) )
    }

    componentWillUnmount() {
        unloadTooltips( ReactDOM.findDOMNode( this ) )
    }
}


export default ActionButton

import * as React from 'react'

import * as classNames from 'classnames'

module ActionButton {
    export interface Props extends React.Props<ActionButton> {
        iconClass: string
        clickAction: ( event?: any ) => void
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

}

export default ActionButton

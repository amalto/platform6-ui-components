import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as classNames from 'classnames'

import { unloadTooltips, loadTooltips } from 'helpers'
import { Ref } from 'react';


module ActionButton {
    /**
     * ActionButton properties
     */
    export interface Props extends React.Props<ActionButton> {
        /** onClick method. */
        clickAction?: React.EventHandler<React.MouseEvent<Element>>
        /** FontAwesome icons. e.g: 'fa-info'. */
        iconClass?: string
        /** Set the icon color class. Do not use if you don't need it, otherwise btnClass will have trouble handeling hover color. */
        colorClass?: string
        /** Disabling button if true. */
        disabled?: boolean
        /** Tooltip text appearing when hovering the button. */
        tooltipText?: string
        /** Button class determining his type, size and color. */
        btnClass?: string

        /**
         * Hide props from documentation
         */

        /** @ignore */
        children: React.ReactNode;
        /** @ignore */
        key: React.ReactText;
        /** @ignore */
        ref: Ref<ActionButton>;
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

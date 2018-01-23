import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as classNames from 'classnames'

import { unloadTooltips, loadTooltips } from 'helpers'

module ActionButton {
    /**
     * ActionButton properties
     */
    export interface Props extends React.Props<ActionButton> {
        /** onClick method. */
        clickAction?: React.EventHandler<React.MouseEvent<Element>>
        /** Any FontAwesome icon CSS class names like "fa-info" or "fa-info fa-lg". */
        iconClass?: string
        /** Set the icon color class. Do not use if you don't need it, otherwise btnClass will have trouble handeling hover color. */
        colorClass?: string
        /** Disabling button if true. */
        disabled?: boolean
        /** A text that will be displayed in the "title" HTML attribute of the button. */
        tooltipText?: string
        /**
         * Any available Portal CSS class names you want to apply to the icon wrapper <strong>div</strong>.
         * This can be used to space the icon from any other content.
         */
        btnClass?: string

        /**
         * Hide props from documentation
         */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<ActionButton>;
    }
}

/**
 * Small button with an icon instead of text.
 */
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

    /**
     * FIXME: To remove and do it on the parent
     */
    componentDidMount() {
        loadTooltips( 'body' as any )
    }

    componentWillUnmount() {
        unloadTooltips( ReactDOM.findDOMNode( this ) )
    }
}


export default ActionButton

import * as React from 'react'
import * as classNames from 'classnames'

/**
 * Small button with an icon instead of text.
 * 
 * @name action-button
 * @see {npm}
 * @version {latest}
 */
module ActionButton {

    export interface Props extends React.Props<ActionButton> {
        /** Action triggered on click event. */
        clickAction?: React.EventHandler<React.MouseEvent<Element>>
        /** Any Font Awesome icon CSS class names like <blockquote>fa-info</blockquote> or <blockquote>fa-info fa-lg</blockquote>. */
        iconClass?: string
        /** Set the icon color class. Do not use if you don't need it, otherwise, <blockquote>btnClass</blockquote> will have trouble handling hover color. */
        colorClass?: string
        /** Disabling button if true. */
        disabled?: boolean
        /** Text that will be displayed in the <blockquote>title</blockquote> HTML attribute of the button. */
        tooltipText?: string
        /**
         * Any available Portal CSS class names you want to apply to the icon wrapper <blockquote>div</blockquote>.
         * This can be used to space the icon from any other content.
         */
        btnClass?: string

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<ActionButton>;
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
                <span className={classNames( this.props.iconClass, this.props.colorClass )}></span>
            </span>
        )
    }
}


export default ActionButton

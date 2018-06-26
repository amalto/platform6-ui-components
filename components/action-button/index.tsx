import * as React from 'react'
import * as classNames from 'classnames'

/**
 * Small button with an icon instead of text.
 */
module ActionButton {

    export interface Props extends React.Props<ActionButton> {
        /** Action triggered on click event. */
        clickAction?: React.EventHandler<React.MouseEvent<Element>>
        /** Any Font Awesome icon CSS class names like <span className='quote'>fa-info</span> or <span className='quote'>fa-info fa-lg</span>. */
        iconClass?: string
        /** Set the icon color class. Do not use if you don't need it, otherwise, <span className='quote'>btnClass</span> will have trouble handling hover color. */
        colorClass?: string
        /** Whether or not the input is disabled. */
        disabled?: boolean
        /** Text that will be displayed in the <span className='quote'>title</span> HTML attribute of the button. */
        tooltipText?: string
        /** Same as <span className='quote'>tooltipText</span> but when the <span className='quote'>button</span> is <span className='quote'>disabled</span>. */
        disabledTooltipText?: string
        /**
         * Any available Portal CSS class names you want to apply to the icon wrapper <span className='quote'>div</span>.
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
                onClick={handleClick} data-toggle="tooltip" data-original-title={this.props.disabled ? this.props.disabledTooltipText : this.props.tooltipText}>
                <span className={classNames( this.props.iconClass, this.props.colorClass )}></span>
            </span>
        )
    }
}


export default ActionButton

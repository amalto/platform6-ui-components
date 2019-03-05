import * as React from 'react'

// Hooks
import Icon from './components/icon'
import Container from './components/container'

/**
 * Small button with an icon instead of text.
 */
module ActionButton {

    export interface Props {
        /** Action triggered on click event. */
        clickAction?: React.EventHandler<React.MouseEvent<Element>>
        /** Any Font Awesome icon CSS class names like <span className='quote'>fa-info</span> or <span className='quote'>fa-info fa-lg</span>. */
        iconClass?: string
        /** Set the icon color class. Do not use if you don't need it, otherwise, <span className='quote'>btnClass</span> will have trouble handling hover color. */
        colorClass?: string
        /** Whether or not the input is disabled.
         * @default false
         */
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
    }
}

class ActionButton extends React.PureComponent<ActionButton.Props, any> {
    constructor( props: ActionButton.Props ) {
        super( props )
    }

    render() {
        return (
            <Container clickAction={this.props.clickAction} disabled={this.props.disabled} tooltipText={this.props.tooltipText} disabledTooltipText={this.props.disabledTooltipText} btnClass={this.props.btnClass}>
                <Icon iconClass={this.props.iconClass} colorClass={this.props.colorClass} />
            </Container>
        )
    }
}

export default ActionButton

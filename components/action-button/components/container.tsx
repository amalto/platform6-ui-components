import * as React from 'react'
import classNames from 'classnames'

module Container {
    export interface Props {
        /** Action triggered on click event. */
        clickAction?: React.EventHandler<React.MouseEvent<Element>>
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

        children?: JSX.Element;
    }
}

// Use React 16.6.x Hooks
function Container( props: Container.Props ) {
    const [originalTitle, setOriginalTitle] = React.useState( undefined )
    const [className, setClassName] = React.useState( 'action-icon-button' )

    // Set tooltip title and onclick event
    React.useEffect( () => {
        setOriginalTitle( props.disabled ? props.disabledTooltipText : props.tooltipText )
    }, [props.disabled] )

    // Set button classname
    React.useEffect( () => {
        setClassName( classNames( 'action-icon-button', props.btnClass, { 'disabled': props.disabled } ) )
    }, [props.disabled, props.btnClass] )

    return (
        <span className={className} onClick={props.disabled ? undefined : props.clickAction} data-toggle="tooltip" data-original-title={originalTitle}>
            {props.children}
        </span>
    )
}

export default Container
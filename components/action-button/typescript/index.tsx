import * as React from 'react'
import * as classnames from 'classnames'


module ActionButton {
    export interface Props extends React.Props<ActionButton> {
        onClick?: React.EventHandler<React.MouseEvent<Element>>
        iconClass?: string
        colorClass?: string
        disabled?: boolean
        tooltipText?: string
        btnClass?: string
    }
}


class ActionButton extends React.Component<ActionButton.Props, any> {
    render () {
        const { props } = this
        const { disabled } = props

        return (
			<span
				className={classnames('action-icon-button', props.btnClass, { 'disabled': disabled })}
				style={{
					backgroundColor: disabled ? '#eee' : '#ea5648',
					color: disabled ? '#444' : '#eee',
					padding: '5px 20px',
					minWidth: '180px',
					textAlign: 'center'
				}}
				onClick={!disabled && props.onClick}
				data-toggle="tooltip"
				data-original-title={props.disabled ? null : props.tooltipText}>
				<span className={classnames('fa', props.iconClass, props.colorClass)}>
					{props.children}
				</span>
			</span>
		)
	}
}


export default ActionButton

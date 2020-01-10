import React, { InputHTMLAttributes } from 'react';
import { Field } from './field.component';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string | JSX.Element;
	help?: string;
}

export class Input extends Field<HTMLInputElement, InputProps> {
	componentDidUpdate(nextProps: Readonly<InputProps>): void {
		if (this.props.value !== nextProps.value && this.ref !== null) {
			this.setState({ ...this.state, validationMessage: this.ref.validationMessage });
		}
	}

	protected renderField(
		id: string,
		className: string | undefined,
		props: Omit<InputProps, 'id' | 'className' | 'label'>
	): JSX.Element | null | false {
		return <input ref={input => (this.ref = input)} className={className} id={id} {...props} />;
	}
}

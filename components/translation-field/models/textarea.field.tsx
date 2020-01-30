import React, { TextareaHTMLAttributes } from 'react';
import { default as classNames } from 'classnames'
import { Field } from './field.component';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string | JSX.Element;
	help?: string;
	useTextarea?: boolean;
}

export class Textarea extends Field<HTMLTextAreaElement, TextareaProps> {
	componentDidUpdate(nextProps: Readonly<TextareaProps>): void {
		if (this.props.value !== nextProps.value && this.ref !== null) {
			this.setState({ ...this.state, validationMessage: this.ref.validationMessage });
		}
	}

	private styles: React.CSSProperties = {
		resize: 'vertical',
		minHeight: 67
	}

	protected renderField(
		id: string,
		className: string | undefined,
		props: Omit<TextareaProps, 'id' | 'className' | 'label'>
	): JSX.Element | null | false {
		return (
			<textarea ref={input => (this.ref = input)}
				className={classNames( className, 'full-width' )}
				id={id}
				key={`key_${id}`}
				style={this.styles}
				{...props}
			/>
		);
	}
}
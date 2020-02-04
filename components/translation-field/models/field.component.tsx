import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';
import { css, cx } from 'emotion';

import Help from '@amalto/help';

interface FieldElement {
	checkValidity: () => boolean;
	validationMessage?: string;
}
interface FieldProps {
	id?: string;
	label?: string | JSX.Element;
	className?: string;
	required?: boolean;
	readOnly?: boolean;
	help?: string;
}

interface FieldState {
	validationMessage?: string;
}

export abstract class Field<
	T extends FieldElement,
	P extends FieldProps,
	S extends FieldState = {}
	> extends PureComponent<P, S> {
	protected ref: T | null = null;
	protected hasReportedValidity = false;
	private readonly randomId: string;

	constructor(props: Readonly<P>) {
		super(props);
		this.state = { ...this.state, validationMessage: undefined };
		this.randomId = uuid();
	}

	componentDidMount(): void {
		this.setState({ ...this.state, validationMessage: undefined });

		if (this.ref) {
			this.ref.checkValidity = this.overrideCheckValidity(this.ref);
		}
	}

	render(): JSX.Element | null | false {
		return this.props.label === undefined ? this.single(this.props) : this.group(this.props);
	}

	protected abstract renderField(
		id: string,
		className: string | undefined,
		props: Omit<P, 'id' | 'className' | 'label'>
	): JSX.Element | null | false;

	protected get isInvalid(): boolean {
		return this.validationMessage !== undefined;
	}

	private get validationMessage(): string | undefined {
		return this.state.validationMessage === '' ? undefined : this.state.validationMessage;
	}

	private single(props: P): JSX.Element {
		const { id, label, className, ...innerProps } = props;
		const htmlFor: string = id !== undefined ? id : this.randomId;

		const requiredCss = cx('mandatory', css({ position: 'relative' }));

		const innerClassName = cx(
			className,
			{ [requiredCss]: !!this.props.required && !this.props.readOnly },
			{ invalid: this.isInvalid && !this.props.readOnly }
		);

		return (
			<div style={{width: '100%'}}>
				{this.renderField(htmlFor, innerClassName, innerProps)}
				{this.renderError()}
			</div>
		);
	}

	private group(props: P): JSX.Element {
		const { id, className, label, ...innerProps } = props;
		const htmlFor: string = id !== undefined ? (id as string) : this.randomId;

		const requiredCss = cx('mandatory', css({ position: 'relative' }));

		const innerClassName = cx(
			'form-group',
			className,
			{ [requiredCss]: !!this.props.required && !this.props.readOnly },
			{ invalid: this.isInvalid && !this.props.readOnly }
		);

		return (
			<div className={innerClassName}>
				<label htmlFor={htmlFor}>
					{label}
					{this.renderHelp()}
				</label>
				{this.renderField(htmlFor, 'form-control', innerProps)}
				{this.renderError()}
			</div>
		);
	}

	private overrideCheckValidity(ref: T): () => boolean {
		const original = ref.checkValidity.bind(ref);

		return (): boolean => {
			const validity = original();
			this.setState({ ...this.state, validationMessage: ref.validationMessage });
			return validity;
		};
	}
	private renderError(): JSX.Element | false | null {
		return this.isInvalid && !this.props.readOnly ? (
			<p className="validation-error-message">{this.validationMessage}</p>
		) : null;
	}

	private renderHelp(): JSX.Element | false | null {
		return this.props.help === undefined || !!this.props.readOnly ? null : (
			<Help text={this.props.help as string} />
		);
	}
}

/** Modules */
import React, { Component } from 'react';
import { WrappedFieldProps, WrappedFieldInputProps, Field, BaseFieldProps } from 'redux-form';

/** Components */
import TransactionField from '@amalto/translation-field';

export interface TranslationProps extends BaseFieldProps {
	/** Set mandatory language by default, if not provided 'en' will be used. */
	defaultLanguage?: string;
	/** Set true to disable the support of internationalization. */
	disableMultilanguage?: boolean;
	/** Set to true if you want to use textarea instead of text input. */
	useTextarea?: boolean;
	/** Input name. */
	name: string;
	/** Inuput label. */
	label: string | JSX.Element;
	/** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
	help?: string;
	/** Is field on readonly. */
	readOnly?: boolean;
	/** Triggered every time the value change. */
	onChange?: (value: { [key: string]: string }) => void;
	/**
	 * Remove the bottom margin which is the default height of the error message
	 * displayed when input is invalid.
	 * @default false
	 */
	collapseErrorSpace?: boolean;
	/**
	 * Language to use on the component which determine the search input's placeholder language. e.g: <span className='quote'>en-US</span>.
	 * Locales available at [Locale](#locale).
	 * Accessible via [WebStorage](#webstorage).
	 * @default 'en-US'
	 */
	locale?: string;

	/** Hide props from documentation */

	/** @ignore */
	children?: React.ReactNode;
	/** @ignore */
	key?: React.ReactText;
	/** @ignore */
	ref?: React.Ref<TransactionField>;

	/** redux-form props */

	/** @ignore */
	component?: any,
	/** @ignore */
	format?: any,
	/** @ignore */
	normalize?: any,
	/** @ignore */
	props?: any,
	/** @ignore */
	parse?: any,
	/** @ignore */
	validate?: any,
	/** @ignore */
	warn?: any,
	/** @ignore */
	withRef?: any
}

interface TranslationState {

}

class TranslationFieldInput extends Component<TranslationProps, TranslationState> {

	constructor(props: Readonly<TranslationProps>) {
		super(props);

		this.state = {

		};
	}

	render(): JSX.Element | null | false {
		return <Field name={this.props.name} component={this.renderField} />
	}

	private renderField = (field: WrappedFieldProps<any>): JSX.Element => {
		const { input } = field

		return (
			<TransactionField {...this.props}
				value={input.value}
				onChange={value => this.onChange(value, input)}
			/>
		)
	}

	private onChange = (value: { [key: string]: string; }, input: WrappedFieldInputProps): void => {
		input.onChange(value, this.props.name, null)
	}
}

export default TranslationFieldInput

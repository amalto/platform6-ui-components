// Modules
import React, { Component } from 'react';
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form';

// Utils
import { WebStorage } from '@amalto/typings';

// Components
import TransactionField from '@amalto/translation-field';

export interface TranslationProps extends BaseFieldProps {
	/** Set true to disable the support of internationalization. */
	disableMultilanguage?: boolean;
	/** Set to true if you want to use textarea instead of text input. */
	useTextarea?: boolean;
	/** Storage which contain instance and user informations. */
	webStorage: WebStorage;
	/** Input name. */
	name: string;
	/** Inuput label. */
	label: string | JSX.Element;
	/** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
	help?: string;
	/** Language options. */
	value: { [key: string]: string };
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

class TranslationField extends Component<TranslationProps, TranslationState> {

	constructor(props: Readonly<TranslationProps>) {
		super(props);

		this.state = {

		};
	}

	render(): JSX.Element | null | false {
		return <Field name={this.props.name} component={this.renderField.bind( this )} />
	}

	private renderField( field: WrappedFieldProps<any> ): JSX.Element {
		const { input } = field

		return (
			<TransactionField {...this.props}
				value={input.value}
				handleFieldChange={input.onChange as any}
			/>
		)
	}
}

export default TranslationField

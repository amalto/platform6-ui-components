import React, { Component } from 'react';
import { ValueType } from 'react-select/lib/types';
import { Language, LanguageCode, languages } from '../constants/languages';
import { Select, SelectProps } from './select.field';

type BaseProps = Pick<
	SelectProps<LanguageCode>,
	Exclude<
		keyof SelectProps<LanguageCode>,
		'options' & 'getOptionLabel' & 'getOptionValue' & 'filterOption'
		>
	>;

export interface SelectLanguageProps extends BaseProps {
	excludes: LanguageCode[];
}

export class SelectLanguage extends Component<SelectLanguageProps> {
	render(): JSX.Element | null | false {
		const { value, excludes, onChange, ...innerProps } = this.props;
		return (
			<Select<Language>
				{...innerProps}
				value={this.getValue(value)}
				options={languages.filter(l => !this.props.excludes.includes(l.code))}
				onChange={this.changeHandler.bind(this)}
				getOptionLabel={lang => lang.enName}
				getOptionValue={lang => lang.code}
			/>
		);
	}

	private changeHandler(value: ValueType<Language>): void {
		if (this.props.onChange !== undefined) {
			if (value === undefined || value === null) {
				this.props.onChange(value);
			} else if (isReadonlyArray(value)) {
				this.props.onChange(value.map(v => v.code));
			} else {
				this.props.onChange(value.code);
			}
		}
	}

	private getValue(value: ValueType<LanguageCode>): ValueType<Language> {
		if (value === undefined || value === null) {
			return value;
		} else if (isReadonlyArray(value)) {
			return languages.filter(c => value.find(v => c.code === v));
		} else {
			return languages.find(c => c.code === value);
		}
	}
}

function isReadonlyArray<T>(value: ReadonlyArray<T> | T): value is ReadonlyArray<T> {
	return Array.isArray(value);
}
